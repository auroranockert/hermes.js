(function() {
  var CSFirefoxFile;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CSFirefoxFile = (function() {
    function CSFirefoxFile(file, errback, callback) {
      var reader, _ref;
      reader = new FileReader();
      _ref = [0, false], this.position = _ref[0], this.endOfFile = _ref[1];
      reader.onload = __bind(function() {
        this.buffer = reader.result;
        this.length = this.remaining = this.buffer.length;
        return callback(this);
      }, this);
      reader.onerror = __bind(function() {
        return errback('CSFile could not be built properly');
      }, this);
      reader.readAsArrayBuffer(file);
      return;
    }
    CSFirefoxFile.prototype.read = function(length, errback, callback) {
      var result;
      if (length > this.remaining) {
        errback('I/O Error: Reading beyond end of file!');
        return;
      }
      if (length === this.remaining) {
        this.endOfFile = true;
      }
      result = CSCopy(alloc(length), 0, this.buffer, this.position, length);
      this.position += length;
      this.remaining -= length;
      callback(result);
    };
    CSFirefoxFile.prototype.peek = function(length, errback, callback) {
      if (length > this.remaining) {
        length = this.remaining;
      }
      callback(CSCopy(CSAlloc(length), 0, this.buffer, this.position, length));
    };
    return CSFirefoxFile;
  })();
  window.CSFirefoxFile = CSFirefoxFile;
}).call(this);
