"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var cors = require("cors");

var app = express();
app.use(cors());

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _openidClient = require("openid-client");

var _xeroNode = require("xero-node");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

require("dotenv").config();

var router = express.Router();

var db = require("../database/db.js");

var authenticationData = function authenticationData(req, res) {
  return {
    decodedIdToken: req.session.decodedIdToken,
    decodedAccessToken: req.session.decodedAccessToken,
    tokenSet: req.session.tokenSet,
    allTenants: req.session.allTenants,
    activeTenant: req.session.activeTenant
  };
};

router.get('/', function (req, res) {
  res.send("/connect'>Connect to Xero</a>");
});
router.get('/connect', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var consentUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return xero.buildConsentUrl();

          case 3:
            consentUrl = _context.sent;
            res.redirect(consentUrl);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            res.send('Sorry, something went wrong');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/callback', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var tokenSet, decodedIdToken, decodedAccessToken, authData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return xero.apiCallback(req.url);

          case 3:
            tokenSet = _context2.sent;
            _context2.next = 6;
            return xero.updateTenants();

          case 6:
            decodedIdToken = jwtDecode(tokenSet.id_token);
            decodedAccessToken = jwtDecode(tokenSet.access_token);
            req.session.decodedIdToken = decodedIdToken;
            req.session.decodedAccessToken = decodedAccessToken;
            req.session.tokenSet = tokenSet;
            req.session.allTenants = xero.tenants; // XeroClient is sorting tenants behind the scenes so that most recent / active connection is at index 0

            req.session.activeTenant = xero.tenants[0];
            authData = authenticationData(req, res);
            console.log(authData);
            res.redirect('/organisation');
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            res.send('Sorry, something went wrong');

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/organisation', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var tokenSet, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return xero.readTokenSet();

          case 3:
            tokenSet = _context3.sent;
            console.log(tokenSet.expired() ? 'expired' : 'valid');
            _context3.next = 7;
            return xero.accountingApi.getOrganisations(req.session.activeTenant.tenantId);

          case 7:
            response = _context3.sent;
            res.send("Hello, ".concat(response.body.organisations[0].name));
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            res.send('Sorry, something went wrong');

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/invoice', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var contacts, where, accounts, contact, lineItem, invoice, invoices, response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return xero.accountingApi.getContacts(req.session.activeTenant.tenantId);

          case 3:
            contacts = _context4.sent;
            console.log('contacts: ', contacts.body.contacts);
            where = 'Status=="ACTIVE" AND Type=="SALES"';
            _context4.next = 8;
            return xero.accountingApi.getAccounts(req.session.activeTenant.tenantId, null, where);

          case 8:
            accounts = _context4.sent;
            console.log('accounts: ', accounts.body.accounts);
            contact = {
              contactID: contacts.body.contacts[0].contactID
            };
            lineItem = {
              accountID: accounts.body.accounts[0].accountID,
              description: 'consulting',
              quantity: 1.0,
              unitAmount: 10.0
            };
            invoice = {
              lineItems: [lineItem],
              contact: contact,
              dueDate: '2021-09-25',
              date: '2021-09-24',
              type: Invoice.TypeEnum.ACCREC
            };
            invoices = {
              invoices: [invoice]
            };
            _context4.next = 16;
            return xero.accountingApi.createInvoices(req.session.activeTenant.tenantId, invoices);

          case 16:
            response = _context4.sent;
            console.log('invoices: ', response.body.invoices);
            res.json(response.body.invoices);
            _context4.next = 24;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            res.json(_context4.t0);

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 21]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get('/contact', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var contact, contacts, response;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            contact = {
              name: "Bruce Banner",
              emailAddress: "hulk@avengers.com",
              phones: [{
                phoneNumber: '555-555-5555',
                phoneType: Phone.PhoneTypeEnum.MOBILE
              }]
            };
            contacts = {
              contacts: [contact]
            };
            _context5.next = 5;
            return xero.accountingApi.createContacts(req.session.activeTenant.tenantId, contacts);

          case 5:
            response = _context5.sent;
            console.log('contacts: ', response.body.contacts);
            res.json(response.body.contacts);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.json(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;