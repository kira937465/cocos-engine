const dynamicAtlasManager = require('./dynamic-atlas/manager');
const WHITE = cc.Color.WHITE;

// share data of bmfont
let shareLabelInfo = {
    fontAtlas: null,
    
    fontSize:0,
    lineHeight:0,
    hAlign:0,
    vAlign:0,

    hash:"",
    fontFamily:"",
    fontDesc:"Arial",
    color:WHITE,
    isOutlined:false,
    out:WHITE,
    margin:0,
}

module.exports = {

    deleteFromDynamicAtlas (comp, frame) {
        if (frame && !CC_TEST) {
            if (frame._original && dynamicAtlasManager) {
                dynamicAtlasManager.deleteAtlasTexture(frame);
                frame._resetDynamicAtlasFrame();
            }
        }
    },

    getFontFamily (comp) {
        if (!comp.useSystemFont) {
            if (comp.font) {
                if (comp.font._nativeAsset) return comp.font._nativeAsset;
                cc.loader.load(comp.font.nativeUrl, (err, asset) => {
                    comp.font._nativeAsset = asset;
                    comp._lazyUpdateRenderData();
                });
                return 'Arial';
            }
    
            return 'Arial';
        }
        else {
            return comp.fontFamily;
        }
    },

    shareLabelInfo: shareLabelInfo
}
