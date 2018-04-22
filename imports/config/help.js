const regexpHelp = `
  Regular Expressions help (a.k.a.: regex, regexp) for keywords field
  ===================================================================
  match "hello" anywhere:                   hello
  match "hello" only at the beginning:     ^hello
  match "hello" only at the end:            hello$
  match "hello you":                        hello you
  match "hello you" only at the beginning: ^hello you
  match "hello you" only at the end:        hello you$
  match "hello" or "hi" anywhere:           hello|hi
  starts with "hello" and ends with "you": ^hello .* you$
  grab exactly one word:                    my name is (\\S+)
  grab exactly two words:                   my name is (\\S+) (\\S+)
  grab anything until end of sentence:      my name is (.*)$         
  
  https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp
`

export { regexpHelp }