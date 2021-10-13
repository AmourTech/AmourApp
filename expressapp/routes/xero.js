
var express = require('express');
var cors = require("cors")
var app = express();
var jwtDecode = _interopRequireDefault(require("jwt-decode"));

var openidClient = require("openid-client");

var xero = require("xero-node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
app.use(cors());

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var redirectUrl = process.env.REDIRECT_URI;
var scopes = 'openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access';

require("dotenv").config()

var router = express.Router();
var db = require( "../database/db.js" );
var xero = new xero.XeroClient({
	clientId: client_id,
	clientSecret: client_secret,
	redirectUris: [redirectUrl],
	scopes: scopes.split(' '),
});
var authenticationData = (req, res) => {
	return {
		decodedIdToken: req.session.decodedIdToken,
		decodedAccessToken: req.session.decodedAccessToken,
		tokenSet: req.session.tokenSet,
		allTenants: req.session.allTenants,
		activeTenant: req.session.activeTenant,
	};
};


router.get('/', (req, res) => {
	res.send(`<a href='/connect'>Connect to Xero</a>`);
});
router.get('/connect', async (req, res) => {
	try {
		var consentUrl = await xero.buildConsentUrl();
		res.send(consentUrl);
	} catch (err) {
		res.send('Sorry, something went wrong');
	}
});
router.get('/callback', async (req, res) => {
	try {
		var tokenSet = await xero.apiCallback(req.body.url);
		await xero.updateTenants();

		var decodedIdToken = jwtDecode(tokenSet.id_token);
		var decodedAccessToken = jwtDecode(tokenSet.access_token);

		req.session.decodedIdToken = decodedIdToken;
		req.session.decodedAccessToken = decodedAccessToken;
		req.session.tokenSet = tokenSet;
		req.session.allTenants = xero.tenants;
		// XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0
		req.session.activeTenant = xero.tenants[0];

		var authData = authenticationData(req, res);

		console.log(authData);

		res.send('/organisation');
	} catch (err) {
        console.log(err)
		res.send('Sorry, something went wrong');
	}
});

router.get('/organisation', async (req, res) => {
	try {
		var tokenSet = await xero.readTokenSet();
		console.log(tokenSet.expired() ? 'expired' : 'valid');
		var response = await xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);
		res.send(`Hello, ${response.body.organisations[0].name}`);
	} catch (err) {
        console.log(err)
		res.send('Sorry, something went wrong');
	}
});

router.get('/invoice', async (req, res) => {
	try {
		var contacts = await xero.accountingApi.getContacts(req.session.activeTenant.tenantId);
		console.log('contacts: ', contacts.body.contacts);
		var where = 'Status=="ACTIVE" AND Type=="SALES"';
		var accounts = await xero.accountingApi.getAccounts(req.session.activeTenant.tenantId, null, where);
		console.log('accounts: ', accounts.body.accounts);
		var contact = {
			contactID: contacts.body.contacts[0].contactID
		};
		var lineItem = {
			accountID: accounts.body.accounts[0].accountID,
			description: 'consulting',
			quantity: 1.0,
			unitAmount: 10.0
		};
		var invoice = {
			lineItems: [lineItem],
			contact: contact,
			dueDate: '2021-09-25',
			date: '2021-09-24',
			type: Invoice.TypeEnum.ACCREC
		};
		var invoices = {
			invoices: [invoice]
		};
		var response = await xero.accountingApi.createInvoices(req.session.activeTenant.tenantId, invoices);
		console.log('invoices: ', response.body.invoices);
		res.json(response.body.invoices);
	} catch (err) {
		res.json(err);
	}
});

router.get('/contact', async (req, res) => {
	try {
		var contact = {
			name: "Bruce Banner",
			emailAddress: "hulk@avengers.com",
			phones: [
				{
					phoneNumber:'555-555-5555',
					phoneType: Phone.PhoneTypeEnum.MOBILE
				}
			]
		};
		var contacts = {  
			contacts: [contact]
		}; 
		var response = await xero.accountingApi.createContacts(req.session.activeTenant.tenantId, contacts);
		console.log('contacts: ', response.body.contacts);
		res.json(response.body.contacts);
	} catch (err) {
		res.json(err);
	}
});

module.exports = router;