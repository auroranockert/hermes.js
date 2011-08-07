(function() {
  var CSArrayFile, CSBinaryFile;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CSArrayFile = (function() {
    function CSArrayFile(file, errback, callback) {
      var reader, _ref;
      reader = new FileReader();
      _ref = [0, false], this.position = _ref[0], this.endOfFile = _ref[1];
      reader.onload = __bind(function() {
        this.buffer = reader.result;
        this.length = this.remaining = this.buffer.length;
        return callback(this);
      }, this);
      reader.onerror = __bind(function() {
        return errback('CSArrayFile could not be built properly');
      }, this);
      reader.readAsArrayBuffer(file);
      return;
    }
    CSArrayFile.prototype.read = function(length, errback, callback) {
      var result;
      if (length > this.remaining) {
        errback('I/O Error: Reading beyond end of file!');
        return;
      }
      if (length === this.remaining) {
        this.endOfFile = true;
      }
      result = CSCopy(CSAlloc(length), 0, this.buffer, this.position, length);
      this.position += length;
      this.remaining -= length;
      callback(result);
    };
    CSArrayFile.prototype.peek = function(length, errback, callback) {
      if (length > this.remaining) {
        length = this.remaining;
      }
      callback(CSCopy(CSAlloc(length), 0, this.buffer, this.position, length));
    };
    return CSArrayFile;
  })();
  window.CSArrayFile = CSArrayFile;
  CSBinaryFile = (function() {
    function CSBinaryFile(file, errback, callback) {
      var reader, _ref;
      reader = new FileReader();
      _ref = [0, false], this.position = _ref[0], this.endOfFile = _ref[1];
      reader.onload = __bind(function() {
        this.string = reader.result;
        this.length = this.remaining = this.string.length;
        return callback(this);
      }, this);
      reader.onerror = __bind(function() {
        return errback('CSBinaryFile could not be built properly');
      }, this);
      reader.readAsBinaryString(file);
      return;
    }
    CSBinaryFile.prototype.read = function(length, errback, callback) {
      var result;
      if (length > this.remaining) {
        errback('I/O Error: Reading beyond end of file!');
        return;
      }
      if (length === this.remaining) {
        this.endOfFile = true;
      }
      result = CSCopyFromString(CSAlloc(length), 0, this.string, this.position, length);
      this.position += length;
      this.remaining -= length;
      callback(result);
    };
    CSBinaryFile.prototype.peek = function(length, errback, callback) {
      if (length > this.remaining) {
        length = this.remaining;
      }
      callback(CSCopyFromString(CSAlloc(length), 0, this.string, this.position, length));
    };
    return CSBinaryFile;
  })();
  window.CSBinaryFile = CSBinaryFile;
}).call(this);
