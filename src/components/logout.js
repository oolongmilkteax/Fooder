const logout = function() {
  this.$store.commit("setAuthentication", false);
  this.$store.commit("setUid", null);
};

export default logout;
