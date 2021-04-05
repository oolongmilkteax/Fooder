const logout = function() {
  this.$store.commit("setAuthentication", false);
  this.$store.commit("setUid", null);
  this.$router.push({ name: "LandingPage"})
};

export default logout;
