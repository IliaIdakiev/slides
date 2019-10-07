"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lit_html_1 = require("lit-html");
var rxjs_1 = require("rxjs");
var fetch_1 = require("rxjs/fetch");
var operators_1 = require("rxjs/operators");
var UserService = {
    login: function (data) { return rxjs_1.of({ firstName: 'Ivan', lastName: 'Ivanov' }).pipe(operators_1.delay(2000)); },
    loadUsers: function () { return fetch_1.fromFetch('https://jsonplaceholder.typicode.com/users').pipe(operators_1.switchMap(function (data) {
        if (data.ok) {
            return data.json();
        }
        return rxjs_1.throwError('Could not fetch!');
    })); }
};
var MessageBus = /** @class */ (function () {
    function MessageBus() {
        this._mbus = new rxjs_1.Subject();
        this._mbus.subscribe(console.log);
    }
    MessageBus.prototype.listen = function (type) {
        return this._mbus.pipe(operators_1.filter(function (m) { return m.type === type; }), operators_1.map(function (m) { return m.data; }));
    };
    MessageBus.prototype.send = function (type, data) {
        this._mbus.next({ type: type, data: data });
    };
    return MessageBus;
}());
exports.MessageBus = MessageBus;
;
var AppEffects = /** @class */ (function () {
    function AppEffects(messageBus) {
        var _this = this;
        this.messageBus = messageBus;
        this.login$ = this.messageBus.listen('[AUTH] Login').pipe(operators_1.switchMap(function (data) { return UserService.login(data).pipe(operators_1.switchMap(function (user) { return [
            { type: '[AUTH] Login Success', data: user },
            { type: '[USERS] Load Users', data: null }
        ]; }), operators_1.startWith({ type: '[GLOBAL] Set Loader', data: true }), operators_1.catchError(function (error) { return [{ type: '[USERS] Load Users Failed', data: error }]; })); }));
        this.loadUsers$ = this.messageBus.listen('[USERS] Load Users').pipe(operators_1.switchMap(function () { return UserService.loadUsers().pipe(operators_1.switchMap(function (users) { return [
            { type: '[USERS] Load Users Success', data: users },
            { type: '[GLOBAL] Set Loader', data: false }
        ]; }), operators_1.catchError(function (error) { return [{ type: '[USERS] Load Users Failed', data: error }]; })); }));
        this.connect = function () {
            rxjs_1.merge.apply(void 0, Object.values(_this).filter(function (val) { return val instanceof rxjs_1.Observable; })).subscribe(_this.messageBus._mbus);
        };
    }
    return AppEffects;
}());
exports.AppEffects = AppEffects;
var appLogin = function (context) { return lit_html_1.html(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n<div>Login</div>\n<form>\n  <div class=\"form-group\">\n    <label for=\"email\">Email</label>\n    <input type=\"email\" id=\"email\" @keyup=", "/>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password</label>\n    <input type=\"password\" id=\"password\" @keyup=", "/>\n  </div>\n  <button type=\"button\" @click=", ">Login</button>\n</form>\n"], ["\n<div>Login</div>\n<form>\n  <div class=\"form-group\">\n    <label for=\"email\">Email</label>\n    <input type=\"email\" id=\"email\" @keyup=", "/>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"password\">Password</label>\n    <input type=\"password\" id=\"password\" @keyup=", "/>\n  </div>\n  <button type=\"button\" @click=", ">Login</button>\n</form>\n"])), function (e) { return context.formData.email = e.target.value; }, function (e) { return context.formData.password = e.target.value; }, function () { return context.loginHandler(context.formData); }); };
var appLoading = function (context) { return lit_html_1.html(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["<div>Loading...</div>"], ["<div>Loading...</div>"]))); };
var appLoggedIn = function (context) { return lit_html_1.html(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["<div>\n  <div>Hello ", "!</div>\n  <div>", "</div>\n</div>"], ["<div>\n  <div>Hello ", "!</div>\n  <div>", "</div>\n</div>"])), context.loggedUser.firstName, context.userList.map(function (user) { return lit_html_1.html(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["<li>", "</li>"], ["<li>", "</li>"])), user.username); })); };
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App(messageBus) {
        var _this = _super.call(this) || this;
        _this.messageBus = messageBus;
        _this.loggedUser = null;
        _this.userList = [];
        _this.isLoading = false;
        _this.formData = {
            email: '',
            password: ''
        };
        _this.loginHandler = function (formData) {
            _this.messageBus.send('[AUTH] Login', formData);
        };
        var root = _this.attachShadow({ mode: 'closed' });
        _this.render = function () {
            var template = _this.isLoading ?
                appLoading : !_this.loggedUser ? appLogin : appLoggedIn;
            lit_html_1.render(template(_this), root);
        };
        _this.render();
        messageBus.listen('[AUTH] Login Success').subscribe(function (user) {
            _this.loggedUser = user;
            _this.render();
        });
        messageBus.listen('[USERS] Load Users Success').subscribe(function (users) {
            _this.userList = users;
            _this.render();
        });
        messageBus.listen('[GLOBAL] Set Loader').subscribe(function (isLoading) {
            _this.isLoading = isLoading;
            _this.render();
        });
        return _this;
    }
    return App;
}(HTMLElement));
exports.App = App;
customElements.define('hg-app', App);
(function init() {
    var messageBus = new MessageBus();
    var appEffects = new AppEffects(messageBus);
    appEffects.connect();
    var app = new App(messageBus);
    document.body.appendChild(app);
})();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=index.js.map