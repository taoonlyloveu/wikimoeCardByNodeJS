var express = require('express');
var router = express.Router();
var apiLogin = require('../api/login');
var apiDailycard = require('../api/dailyCard');
var apiReg = require('../api/reg');
var apiFind = require('../api/find');
var apiSearchCard = require('../api/searchCard');
var apiSearchCardByToken = require('../api/searchCardByToken');
var apiSearchLog = require('../api/searchLog');
var apiCaptcha = require('../api/captcha');
var apiSendMail = require('../api/sendEmail');
var apiUserInfo = require('../api/userInfo');
var apiShop = require('../api/shop');
var apiLogout = require('../api/logout');
var apiNews = require('../api/searchNews');
var apiMarketSell = require('../api/marketSell');
var apiMarketBuy = require('../api/marketBuy');
var apiMarketChart = require('../api/marketChart');
var apiGravatar = require('../api/gravatar');
var apiSiteConfig = require('../api/siteConfig');
var apiBattle = require('../api/battle');
var apiBattleCard = require('../api/battlecard');
var apiRank = require('../api/rank');
var apiDecompose = require('../api/decompose');
var apiDecomposeitem = require('../api/decomposeitem');
var apiWantCard = require('../api/wantCard');
var apiSearchWantCard = require('../api/searchWantCard');
var apiSearchBattleInfo = require('../api/searchBattleInfo');
var apiSearchCardLevel = require('../api/searchCardLevel');
var apiSearchUserItem = require('../api/searchUserItem');
var apiUpgradecard = require('../api/upgradecard');
var apiDailyGetItem = require('../api/dailyGetItem');
var apiDailyGetItemMenu = require('../api/dailyGetItemMenu');
var apiCardLevelChange = require('../api/cardLevelChange');
var apiSearchBattleLogs = require('../api/searchBattleLogs');
var apiSearchCardPackage = require('../api/searchCardPackage');
var apiUploadcard = require('../api/uploadcard');
var apiHandbook = require('../api/handbook');
var apiSearchCreatCard = require('../api/searchcreatcard');
var apiSearchGuessCard = require('../api/searchGuessCard');
var apiUserGuessCard = require('../api/userGuessCard');
var apiUserPost = require('../api/post');
var apiRobotCheck = require('../api/robotCheck');
var apiQuest = require('../api/quest');

var adminApiCheckInstall = require('../api/admin/install/checkInstall');
var adminApiInstall = require('../api/admin/install/install');
var adminApiLoging = require('../api/admin/login');
var adminApiSetting = require('../api/admin/setting');
var adminApiGiveStar = require('../api/admin/givestar');
var adminApiSearchUser = require('../api/admin/searchUser');
var adminApiBan = require('../api/admin/ban');
var adminApiPasswordChange = require('../api/admin/passwordChange');
var adminApiLogout = require('../api/admin/logout');
var adminsecretkey = require('../api/admin/secretkey');
var adminApiSearchLog = require('../api/admin/searchLog');
var adminApiNews = require('../api/admin/news');
var adminApiRenameCardPackage = require('../api/admin/cardPackage');
var adminApiCreatCard = require('../api/admin/creatcard');
var adminApiSearchCard = require('../api/admin/searchCard');
var adminApiEditCard = require('../api/admin/cardEdit');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/captcha', apiCaptcha);
router.get('/gravatar.png', apiGravatar);
router.get('/siteConfig.js', apiSiteConfig);
router.get('/rank', apiRank);
router.post('/dailycard', apiDailycard);
router.post('/reg', apiReg);
router.post('/find', apiFind);
router.post('/searchcard', apiSearchCard);
router.post('/searchcardbytoken', apiSearchCardByToken);
router.post('/searchlog', apiSearchLog);
router.post('/sendmail', apiSendMail);
router.post('/login', apiLogin);
router.post('/userinfo', apiUserInfo);
router.post('/shop', apiShop);
router.post('/logout', apiLogout);
router.post('/news', apiNews);
router.post('/marketsell', apiMarketSell);
router.post('/marketbuy', apiMarketBuy);
router.post('/marketchart', apiMarketChart);
router.post('/battle', apiBattle);
router.post('/battlecard', apiBattleCard);
router.post('/decompose', apiDecompose);
router.post('/decomposeitem', apiDecomposeitem);
router.post('/wantcard', apiWantCard);
router.post('/searchwantcard', apiSearchWantCard);
router.post('/searchbattleinfo', apiSearchBattleInfo);
router.post('/searchcardlevel', apiSearchCardLevel);
router.post('/searchuseritem', apiSearchUserItem);
router.post('/upgradecard', apiUpgradecard);
router.post('/dailygetitem', apiDailyGetItem);
router.post('/dailygetitemmenu', apiDailyGetItemMenu);
router.post('/cardlevelchange', apiCardLevelChange);
router.post('/searchbattlelogs', apiSearchBattleLogs);
router.post('/uploadcard', apiUploadcard);
router.post('/searchcardpackage', apiSearchCardPackage);
router.post('/handbook', apiHandbook);
router.post('/searchcrearchcard', apiSearchCreatCard);
router.post('/searchguesscard', apiSearchGuessCard);
router.post('/userguesscard', apiUserGuessCard);
router.post('/userpost', apiUserPost);
router.post('/robotcheck', apiRobotCheck);
router.post('/quest', apiQuest);

router.get('/admin/checkinstall', adminApiCheckInstall);
router.post('/admin/install', adminApiInstall);
router.post('/admin/login', adminApiLoging);
router.post('/admin/setting', adminApiSetting);
router.post('/admin/givestar', adminApiGiveStar);
router.post('/admin/searchuser', adminApiSearchUser);
router.post('/admin/ban', adminApiBan);
router.post('/admin/passwordchange', adminApiPasswordChange);
router.post('/admin/logout', adminApiLogout);
router.post('/admin/secretkey', adminsecretkey);
router.post('/admin/searchlog', adminApiSearchLog);
router.post('/admin/news', adminApiNews);
router.post('/admin/renamecardpackage', adminApiRenameCardPackage);
router.post('/admin/creatcard', adminApiCreatCard);
router.post('/admin/searchcard', adminApiSearchCard);
router.post('/admin/editcard', adminApiEditCard);

module.exports = router;