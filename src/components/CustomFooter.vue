<template>
  <div class="site-footer">
    <div class="central">
      <div>
        <h6>About fooder</h6>
        <p
          class="text-justify"
        >Fooder aims to provide a platform for users to contribute by sharing their own unique take on personal recipes and favourite restaurants, creating a community for foodies to share their passion with like-minded individuals.</p>
        <h6>Lets get in touch</h6>
        <ul class="footer-links">
          <li>
            <button
              v-on:click="go('https://github.com/Telentovj/Fooder')"
            >John Vijay Balasupramaniam</button>
          </li>
          <li>
            <button v-on:click="go('https://github.com/jaxminx')">Jasmine Chen Yu Qing</button>
          </li>
          <li>
            <button v-on:click="go('https://github.com/Imbabot7')">Kenneth Khoo Kai Sheng</button>
          </li>
          <li>
            <button v-on:click="go('https://github.com/oolongmilkteax')">Ho Pei San Rachel</button>
          </li>
        </ul>
      </div>
      <hr />
      <p class="copyright-text">
        Copyright &copy; 2021 All Rights Reserved by
        <a href="#">JJKH</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go: function(url) {
      window.open(url);
    }
  }
};
</script>

<style>
hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: white;
  height: 1px;
}
.central {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 3%;
  padding-right: 3%;
}
.footer-links s {
  background-color: #26272b;
  color: #737373;
  border: 0px;
}
.footer-links button {
  background-color: #26272b;
  color: #737373;
  border: 0px;
  padding-left: 0;
}
.footer-links button:hover {
  color: #3366cc;
  cursor: pointer;
}
.site-footer {
  background-color: #26272b;
  padding: 70px 0 5px;
  font-size: 15px;
  line-height: 24px;
  color: #737373;
  width: 100%;
  margin-top: 5%;
  position: relative;
  bottom: 0px;
  height: 430px;
  vertical-align: centre;
}
.site-footer hr {
  border-top-color: #bbb;
  opacity: 0.5;
}
.site-footer hr.small {
  margin: 20px 0;
}
.site-footer h6 {
  color: #fff;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.site-footer p {
  font-size: 17px;
  margin-bottom: 20px;
}

.site-footer a {
  color: #737373;
}
.footer-links {
  padding-left: 0;
  list-style: none;
}
.footer-links li {
  display: block;
  font-size: 17px;
}
.footer-links.inline li {
  display: inline-block;
}
.site-footer .social-icons {
  text-align: right;
}
.site-footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #33353d;
}
.copyright-text {
  margin: 0;
  text-align: center;
  margin-top: 10px;
  font-size: 17px;
}
@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}
.social-icons a {
  background-color: #eceeef;
  color: #818a91;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover {
  color: #fff;
  background-color: #29aafe;
}
.social-icons.size-sm a {
  line-height: 34px;
  height: 34px;
  width: 34px;
  font-size: 14px;
}
.social-icons a.facebook:hover {
  background-color: #3b5998;
}
.social-icons a.twitter:hover {
  background-color: #00aced;
}
.social-icons a.linkedin:hover {
  background-color: #007bb6;
}
.social-icons a.dribbble:hover {
  background-color: #ea4c89;
}
@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
}
</style>  