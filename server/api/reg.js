const usersModel = require('../models/v3/users');
const emailCodeModel = require('../models/v3/emailCode');
const md5 = require('md5-node');
const utils = require('../utils/utils');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const userData = require('../utils/database/user');
const userBattleInfo = require('../utils/database/userBattleInfo');
const userDeminingInfo = require('../utils/database/userDeminingInfo');
const userGuessCardInfo = require('../utils/database/userGuessCardInfo');
const userItem = require('../utils/database/userItem');
const userDaliyGetItem = require('../utils/database/userDaliyGetItem');
const userStatistics = require('../utils/database/userStatistics');
const userCard = require('../utils/database/userCard');


module.exports = async function (req, res, next) {
    let IP = utils.getUserIp(req);
    console.info(
        chalk.green(req.body.email + '提交了一次注册！IP为：' + IP)
    )
    // 数据验证
    if (req.body.email && req.body.nickName && req.body.password) {//判断是否有数据
        //验证邮箱
        let email = req.body.email;
        let nickName = req.body.nickName;
        let password = req.body.password;
        let emailCode = req.body.emailCode;
        let SK = req.body.secretkey;
        if (!utils.emailCheck(email)) {
            res.send({
                code: 0,
                msg: '邮箱格式有误！'
            });
            console.info(
                chalk.yellow(req.body.email + '邮箱格式有误！IP为：' + IP)
            )
            return false;
        }
        email = email.toLowerCase();
        if (!utils.passwordCheck(password)) {
            res.send({
                code: 0,
                msg: '密码必须为4-16位英数字下划线减号'
            });
            console.info(
                chalk.yellow(req.body.email + '密码格式有误！IP为：' + IP)
            )
            return false;
        }
        if (!utils.nickNameCheck(nickName)) {
            res.send({
                code: 0,
                msg: '昵称只能允许为2-8位中英日数字与下划线！'
            });
            console.info(
                chalk.yellow(req.body.email + '昵称格式有误！IP为：' + IP)
            )
            return false;
        }
        let adminSK_ = false;
        if (SK) {
            adminSK_ = await utils.adminSK(SK);
        }
        let emailCodeData = null;
        if (!adminSK_) {
            emailCodeData = await emailCodeModel.findOne({ email: email }, async function (err, result) {
                if (err) {
                    throw err;
                } else {
                    //判断是否有该邮箱
                    if (result) {
                        return result;
                    } else {
                        return null;
                    }
                }
            });
            if (emailCodeData) {
                let time = Math.round(new Date().getTime() / 1000);
                if (time - new Date(emailCodeData.date).getTime() > 1800) {
                    res.send({
                        code: 0,
                        msg: '邮箱验证码已过期！'
                    });
                    console.info(
                        chalk.yellow(req.body.email + '邮箱验证码过期！IP为：' + IP)
                    )
                    return false;
                } else if (emailCodeData.code !== emailCode) {
                    res.send({
                        code: 0,
                        msg: '邮箱验证码错误！'
                    });
                    console.info(
                        chalk.yellow(req.body.email + '邮箱验证码错误！IP为：' + IP)
                    )
                    return false;
                }
            } else {
                res.send({
                    code: 0,
                    msg: '邮箱验证码错误！'
                });
                console.info(
                    chalk.yellow(req.body.email + '邮箱验证码错误！IP为：' + IP)
                )
                return false;
            }
        }
        let params = {
            email: email
        }
        let result = await userData.findUser(params).catch((err) => {
            res.send({
                code: 0,
                msg: '内部错误请联系管理员！'
            });
            console.error(
                chalk.red('数据库查询错误！')
            );
            throw err;
        })
        //判断是否有该用户
        if (result) {
            res.send({
                code: 0,
                msg: '该邮箱已注册！'
            });
            console.info(
                chalk.yellow(req.body.email + '邮箱已注册，注册失败！IP为：' + IP)
            )
            return false;
        } else {
            // 对战信息创建
            const userbattleInfosData = {
                battleScoreHistory: [],
            };
            const newUserbattleInfosData = await userBattleInfo.saveUserBattleInfo(userbattleInfosData).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 挖矿信息创建
            const newUserDeminingInfoData = await userDeminingInfo.save({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 猜卡信息创建
            const newUserGuessCardInfoData = await userGuessCardInfo.saveUserGuessCard({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 道具信息创建
            const newUserItemData = await userItem.saveItem({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 签到信息创建
            const newUserDaliyGetItemData = await userDaliyGetItem.saveUserDaliyGetItem({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 用户的各种统计数据创建
            const newUserStatisticsData = await userStatistics.save({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            })
            // 用户卡牌创建
            const newUserCardData = await userCard.save({}).catch((err) => {
                console.error(
                    chalk.red('数据库查询错误！')
                );
                throw err;
            });
            // 用户信息
            var creatAccountData = {
                email: email,
                nickName: nickName,
                password: md5(password),
                md5: md5(email),
                star: 780,
                ip: IP,
                battleInfo: newUserbattleInfosData._id,
                deminingInfo: newUserDeminingInfoData._id,
                guessCardInfo: newUserGuessCardInfoData._id,
                itemInfo: newUserItemData._id,
                daliyGetItemInfo: newUserDaliyGetItemData._id,
                statistics: newUserStatisticsData._id,
                userCard: newUserCardData._id
            }
            let content = { email: email }; // 要生成token的主题信息
            let secretOrPrivateKey = global.myAppConfig.JWTSecret; // 这是加密的key（密钥）
            let remTime = 60 * 60 * 24;//24小时失效
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: remTime
            });
            creatAccountData['token'] = token;
            // document作成
            var user = new usersModel(creatAccountData);

            // document保存
            user.save(function (err) {
                if (err) {
                    res.send({
                        code: 0,
                        msg: '内部错误请联系管理员！'
                    });
                    throw err
                } else {
                    let logObject = {
                        email: email,
                        md5: md5(email),
                        nickName: nickName,
                        type: 'register',
                        data: {},
                        ip: IP
                    }
                    utils.writeLog(logObject);
                    res.send({
                        code: 1,
                        token: token,
                        msg: '注册成功！'
                    });
                    console.info(
                        chalk.green('邮箱：' + email + '，注册成功。IP为：' + IP)
                    )
                };
            });
        }
    } else {
        res.send({
            code: 0,
            msg: '参数不正确！'
        });
        console.info(
            chalk.yellow('参数不正确。IP为：' + IP)
        )
    }
}