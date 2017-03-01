function callNotNull (fun, args) {
  if (fun != null) {
    fun.apply(null, args)
  }
}

function propOrState (self, name) {
  if (self.props[name] != null) return self.props[name]
  return self.state[name]
}

export {
  callNotNull,
  propOrState
}
