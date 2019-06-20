var utils = require('../utils/utils');
var userbattleinfoData = require('../utils/database/userbattleinfo');
var itemData = require('../utils/database/item.js');
var cardData = require('../data/cardData');
var chalk = require('chalk');
var userData = require('../utils/database/user');

module.exports = async function(req, res, next){
    let IP = utils.getUserIp(req);
    let token = req.body.token;
    let fromCardId = req.body.fromCardId || 0;
    let toCardId = req.body.toCardId || 0;
    console.info(
        chalk.green('开始转移卡牌等级,IP为：'+IP)
    )
    //解析token
    if(!token){
        console.info(
            chalk.yellow(IP+'参数有误！')
        )
        res.send({
            code:403,
            msg:'token为空！'
        });
        return false;
    }
    let result = await utils.tokenCheckAndEmail(token).catch ((err)=>{
        throw err;
    });
    if(!result){
        res.send({
            code:403,
            msg:'账户信息已失效，请重新登录！'
        });
        console.info(
            chalk.yellow('查询结果无该用户,IP为：'+IP)
        );
        return false;
    }
    let email = result.email;
    console.info(
        chalk.green(IP+'的邮箱解析结果为'+email)
    )
    //检查卡牌是否存在
    let fromCardData = cardData['cardData'][utils.PrefixInteger(fromCardId,4)];
    let toCardData = cardData['cardData'][utils.PrefixInteger(toCardId,4)];
    if(!fromCardData || !toCardData){
        res.send({
            code:0,
            msg:'您没有这张卡！'
        });
        console.info(
            chalk.yellow(email+'查询了不存在的卡,IP为：'+IP)
        );
        return false;
    }
    //检查星级和属性是否合格
    if(fromCardData.star!==toCardData.star){//检查星级
        res.send({
            code:0,
            msg:'转移必须两张卡的星级一样！'
        });
        console.info(
            chalk.yellow(email+'想转移星级不一样的卡,IP为：'+IP)
        );
        return false;
    }
    if(fromCardData.leftType!==toCardData.leftType){//检查属性
        res.send({
            code:0,
            msg:'转移必须两张卡的被动属性一样！'
        });
        console.info(
            chalk.yellow(email+'想转移被动属性不一样的卡,IP为：'+IP)
        );
        return false;
    }
    //检查用户是否有卡
    if(!result.card){
        res.send({
            code:0,
            msg:'您还没有卡牌！'
        });
        console.info(
            chalk.yellow(email+'想转移卡牌等级但是没有卡牌,IP为：'+IP)
        );
        return false;
    }
    //查询道具信息
    let params = {
        email:email
    }
    let itemData_ = await itemData.findOne(params).catch ((err)=>{
        res.send({
            code:0,
            msg:'内部错误请联系管理员！'
        });
        console.error(
            chalk.red('数据库错误！')
        );
        throw err;
    }) || {};
    let userItemData = itemData_['item'] || {};//获取道具信息
    let myItemNum = userItemData['200'] || 0;
    if(myItemNum<=0){
        res.send({
            code:0,
            msg:'转移道具不足！'
        });
        console.info(
            chalk.yellow(email+'想转移卡牌等级没道具,IP为：'+IP)
        );
        return false;
    }
    //查询等级信息
    let myCardLevel = await userbattleinfoData.findOne({email:email},'-_id').catch ((err)=>{
        res.send({
            code:0,
            msg:'内部错误请联系管理员！'
        });
        console.error(
            chalk.red('数据库错误！')
        );
        throw err;
    })|| {};
    myCardLevel = myCardLevel['cardLevel'] || {};
    let fromCardLevel = myCardLevel[fromCardId]||0;
    let toCardLevel = myCardLevel[toCardId]||0;
    if(fromCardLevel<=toCardLevel){
        res.send({
            code:0,
            msg:'转移的卡牌的等级必须超过接收卡牌的等级！'
        });
        console.info(
            chalk.yellow(email+'想转移卡牌但是等级不对,IP为：'+IP)
        );
        return false;
    }
    //开始转移
    //升级
    let update = {
        
    };
    update['cardLevel.'+fromCardId] = 0;
    update['cardLevel.'+toCardId] = fromCardLevel;
    await userbattleinfoData.findOneAndUpdate(params,update).catch ((err)=>{
        res.send({
            code:0,
            msg:'内部错误请联系管理员！'
        });
        console.error(
            chalk.red('数据库错误！')
        );
        throw err;
    });
    let itemDataBase = {};
    itemDataBase['item.200'] = -1;
    let updataItemParams = {
        $inc:itemDataBase,
    }
    await itemData.findOneAndUpdate(params,updataItemParams).catch ((err)=>{
        res.send({
            code:0,
            msg:'内部错误请联系管理员！'
        });
        console.error(
            chalk.red('数据库错误！')
        );
        throw err;
    })
    res.send({
        code:1,
        msg:'卡牌等级转移成功！'
    });
    console.info(
        chalk.green(email+'卡牌等级转移成功！')
    )
}