(function() {
  var EncodeFormView, Encoder, chmodSync, platform, spawn,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  $(function() {
    var form;
    form = new EncodeFormView({
      logsElem: $("div.logs")
    });
    return form.render().$el.appendTo($("div.form"));
  });

  spawn = require("child_process").spawn;

  platform = require("os").platform;

  chmodSync = require("fs").chmodSync;

  Encoder = (function() {

    function Encoder(_arg) {
      this.source = _arg.source, this.bitrate = _arg.bitrate, this.target = _arg.target, this.log = _arg.log;
      this.target || (this.target = this.source.replace(/\.wav$/, ".mp3"));
      this.bitrate || (this.bitrate = 128);
      switch (platform()) {
        case "darwin":
          this.pathToBin = "vendor/bin/osx/shineenc";
          break;
        case "win32":
          this.pathToBin = "vendor/bin/win32/shineenc.exe";
      }
      chmodSync(this.pathToBin, 0755);
    }

    Encoder.prototype.process = function() {
      var _this = this;
      this.log("Starting encoding process..");
      this.child = spawn(this.pathToBin, ["-b", this.bitrate, this.source, this.target]);
      this.child.stdout.on("data", function(data) {
        return _this.log("" + data);
      });
      this.child.stderr.on("data", function(data) {
        return _this.log("ERROR: " + data);
      });
      return this.child.on("exit", function(code) {
        return _this.log("Encoding process exited with code: " + code);
      });
    };

    return Encoder;

  })();

  EncodeFormView = (function(_super) {

    __extends(EncodeFormView, _super);

    function EncodeFormView() {
      EncodeFormView.__super__.constructor.apply(this, arguments);
    }

    EncodeFormView.prototype.tagName = "form";

    EncodeFormView.prototype.events = {
      "submit": "onSubmit"
    };

    EncodeFormView.prototype.initialize = function(_arg) {
      this.logsElem = _arg.logsElem;
    };

    EncodeFormView.prototype.render = function() {
      this.$el.html("File: <input class=\"file\" type=\"file\"><br>\nBitrate: <input class=\"bitrate\" type=\"text\" value=\"128\"><br>\n<input type=\"submit\" value=\"Encode!\">");
      return this;
    };

    EncodeFormView.prototype.onSubmit = function(e) {
      var data,
        _this = this;
      e.preventDefault();
      data = {
        source: this.$("input.file").val(),
        bitrate: parseInt(this.$("input.bitrate").val()),
        log: function(data) {
          return _this.logsElem.html("" + (_this.logsElem.html()) + "<br>" + data);
        }
      };
      if (data.source == null) return console.log("no file!");
      return (new Encoder(data)).process();
    };

    return EncodeFormView;

  })(Backbone.View);

}).call(this);
