const logout = function() {
  this.$store.commit("setAuthentication", false);
  this.$store.commit("setUid", null);
  this.$store.commit("setFirstLogin", true);
  this.$router.push({
    name: "LandingPage",
  });
};

export default logout;
