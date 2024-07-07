import { InsertCard } from "../db/model";
import { load, CheerioAPI } from "cheerio";

const Mapper: { [key: string]: string } = {
    "カード名": "name",
    "カード名読み": "kana_name",
    "カード番号": "card_no",
    "商品名": "product_name",
    "ネオスタンダード区分": "neo_standard",
    "作品番号": "expansion_no",
    "レアリティ": "rarity",
    "サイド": "side",
    "種類": "card_type",
    "色": "color",
    "レベル": "level",
    "コスト": "cost",
    "パワー": "power",
    "ソウル": "soul",
    "トリガー": "trigger",
    "特徴": "special_attribute",
    "テキスト": "text",
    "フレーバー": "flavor",
    "イラスト": "illustrator",
};

type Side = "w" | "s";

type CardType = "character" | "event" | "climax";

const CardTypeMapper: { [key: string]: CardType } = {
    "キャラ": "character",
    "イベント": "event",
    "クライマックス": "climax",
};

type Color = "red" | "blue" | "green" | "yellow" | "purple" | "none";

const ColorMapper: { [key: string]: Color } = {
    "赤": "red",
    "青": "blue",
    "緑": "green",
    "黄": "yellow",
    "紫": "purple",
    "無色": "none",
};

function buildCardName($: CheerioAPI, card: InsertCard) {
    const first = $(".card-detail-table tr.first td");
    const imgSrc = first.find("img").attr("src");
    const name = first.find("img").attr("alt");
    const nameKey = first.next().text();
    const kanaName = first.parent().find(".kana").text();

    card.image = imgSrc;
    card.name = name;
    card.kana_name = kanaName;
}

function getGifName(url: string | undefined) {
    if (!url) return;
    const result = url.match(/_partimages\/(.*).gif/)
    if (!result) return;
    return result[1];
}

function getNumber(value: string | undefined) {
    if (!value) return;
    try {
        return parseInt(value);
    } catch (e) {
        return;
    }
}

export async function buildCardInfo(cardno: string) {
    const $ = await fetch(`https://ws-tcg.com/cardlist/?cardno=${cardno}`)
        .then(res => res.text())
        .then(text => load(text));

    let card: InsertCard = {
        card_no: cardno,
    } as InsertCard;

    buildCardName($, card);

    $(".card-detail-table tr:not(.first) th").each((i, elem) => {
        const key = Mapper[$(elem).text()];
        const $value = $(elem).next();
        switch (key) {
            case "side":
                card.side = getGifName($value.find("img").attr("src"));
                break;
            case "card_type":
                card.card_type = CardTypeMapper[$value.text()];
                break;
            case "color":
                card.color = getGifName($value.find("img").attr("src"));
                break;
            case "soul":
                card.soul = $value.find("img").length;
                break;
            case "trigger":
                card.trigger = $value.find("img").map((i, elem) => {
                    return getGifName($(elem).attr("src"));
                }).toArray().join(",");
                break;
            case "special_attribute":
                card.special_attribute = $value.text().split("・").join(",");
                break;
            case "level":
            case "cost":
            case "power":
                card[key] = getNumber($value.text());
                break;
            case "card_no":
            case "text":
            case "flavor":
            case "illustrator":
                const value = $value.text();
                card[key] = value;
        }
    });

    return card;
}