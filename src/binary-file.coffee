class CSBinaryFile
	constructor: (file, errback, callback) ->
		reader = new FileReader()
		
		[@position, @endOfFile] = [0, false]
		
		reader.onload = () =>
			@string = reader.result
			@length = @remaining = @string.length
			
			callback(this)
		
		reader.onerror = () =>
			errback('CSBinaryFile could not be built properly')
		
		reader.readAsBinaryString(file)
		
		return
	
	read: (length, errback, callback) ->
		if length > @remaining
			errback('I/O Error: Reading beyond end of file!'); return
		
		if length == @remaining
			@endOfFile = true
		
		result = CSCopyFromString(CSAlloc(length), 0, @string, @position, length)
		
		@position += length; @remaining -= length
		
		callback(result)
		
		return
	
	peek: (length, errback, callback) ->
		if length > @remaining
			length = @remaining
		
		callback(CSCopyFromString(CSAlloc(length), 0, @string, @position, length))
		
		return
	
window.CSBinaryFile = CSBinaryFile