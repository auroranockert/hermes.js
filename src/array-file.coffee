class CSArrayFile
	constructor: (file, errback, callback) ->
		reader = new FileReader()
		
		[@position, @endOfFile] = [0, false]
		
		reader.onload = () =>
			@buffer = reader.result
			@length = @remaining = @buffer.length
			
			callback(this)
		
		reader.onerror = () =>
			errback('CSArrayFile could not be built properly')
		
		reader.readAsArrayBuffer(file)
		
		return
	
	read: (length, errback, callback) ->
		if length > @remaining
			errback('I/O Error: Reading beyond end of file!'); return
		
		if length == @remaining
			@endOfFile = true
		
		result = CSCopy(CSAlloc(length), 0, @buffer, @position, length)
		
		@position += length; @remaining -= length
		
		callback(result)
		
		return
	
	peek: (length, errback, callback) ->
		if length > @remaining
			length = @remaining
		
		callback(CSCopy(CSAlloc(length), 0, @buffer, @position, length))
		
		return
	
window.CSArrayFile = CSArrayFile