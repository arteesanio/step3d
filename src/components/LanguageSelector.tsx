import React from 'react';
import { useLanguageContext } from '../context/LanguageContext';
import { Language } from '../scripts/helpers';

export const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguageContext();
    

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
    };

    return (
        <div className="tx-altfont-2   hover- 4 pa-1 bord-r-50"
                style={
                    {
                        background: "linear-gradient(180deg, #dddddd, #AAAAAA 30%, #444444 100%)",
                    }
                }>
                    {/* <div 
                    className="button- 29 py-2 px-4 bord-r-50"
                    style={{
                        background: "linear-gradient(170deg, #C12911, #FC9419)",
                        color: "#ffffff",
                        textShadow: "2px 2px 1px #773300",
                    }}>
                        <div className="tx-xl px-4 Q_md_x">Start Game</div>
                        <div className="tx-lgx Q_xs_md">Start Game</div>
                    </div> */}

                    
        <div className="language-selector flex gap-1 pa-1">
            <button 
                onClick={() => handleLanguageChange('en')}
                // className={`px-2 py-1 ${language === 'en' ? 'bg-b-50' : 'bg-b-20'} tx-white tx-shadow-2 noborder bord-r-10 opaci-chov--50`}
                className="button- 29 py-2 px-2  opaci-chov--50 bord-r-l-50"
                    style={{
                        background: language === 'en' ? "linear-gradient(0deg, #F7B351 40%, #EA5F10, #BD4A0D)" : "linear-gradient(170deg, #999999, #555555)",
                        color: "#ffffff",
                        textShadow: "2px 2px 1px #773300",
                        boxShadow: language === 'en' ?  "inset 3px 3px 3px #00000077" : "2px 2px 2px #00000077",
                    }}
            >
                EN
            </button>
            <button 
                onClick={() => handleLanguageChange('es')}
                // className={`px-2 py-1 ${language === 'es' ? 'bg-b-50' : 'bg-b-20'} tx-white tx-shadow-2 noborder bord-r-10 opaci-chov--50`}
                className="button- 29 py-2 px-2  opaci-chov--50 bord-r-r-50"
                    style={{
                        background: language === 'es' ? "linear-gradient(0deg, #F7B351 40%, #EA5F10, #BD4A0D)" : "linear-gradient(170deg, #999999, #555555)",
                        color: "#ffffff",
                        textShadow: "2px 2px 1px #773300",
                        boxShadow: language === 'es' ?  "inset 3px 3px 3px #00000077" : "2px 2px 2px #00000077",
                    }}
            >
                ES
            </button>
        </div>


                </div>
    );
}; 