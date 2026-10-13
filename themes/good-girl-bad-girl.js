(() => {
 const root='assets/good-girl-bad-girl/';
 const transparent=`${root}transparent.webp`;
 window.SLOT_GAME_CONFIG={
  schemaVersion:1,id:'good-girl-bad-girl',
  assets:{frame:{portrait:`${root}frame-landscape.webp`,fallback:`${root}frame-landscape.webp`},loading:`${root}loading.webp`,spin:{normal:transparent,pressed:transparent},indicators:{balance:transparent,bet:transparent,lines:transparent},announcementFrame:transparent,bigWin:transparent,lowWin:transparent,paytableFrame:transparent,winFrames:[{key:'ggbg-win-glow',src:transparent}]},
  symbols:[
   {key:'good-girl',label:'Good Girl',asset:`${root}symbols/good-girl-smile.webp`,animationFrames:[`${root}symbols/good-girl-smile.webp`,`${root}symbols/good-girl-happy.webp`]},
   {key:'bad-girl',label:'Bad Girl',asset:`${root}symbols/bad-girl-devil.webp`,animationFrames:[`${root}symbols/bad-girl-devil.webp`,`${root}symbols/bad-girl-devil-2.webp`,`${root}symbols/bad-girl-devil-3.webp`]},
   {key:'mystic-seer',label:'Mystic Seer',asset:`${root}symbols/mystic-seer.webp`},
   {key:'wild-hunter',label:'Wild Hunter',asset:`${root}symbols/wild-hunter.webp`},
   {key:'spellbook',label:'Spellbook',asset:`${root}symbols/spellbook.webp`},
   {key:'golden-chalice',label:'Golden Chalice',asset:`${root}symbols/golden-chalice.webp`},
   {key:'silver-coins',label:'Silver Coins',asset:`${root}symbols/silver-coins.webp`},
   {key:'letter-9',label:'9',asset:`${root}symbols/letter-9.webp`},
   {key:'letter-10',label:'10',asset:`${root}symbols/letter-10.webp`},
   {key:'letter-j',label:'J',asset:`${root}symbols/letter-j.webp`},
   {key:'letter-q',label:'Q',asset:`${root}symbols/letter-q.webp`},
   {key:'letter-k',label:'K',asset:`${root}symbols/letter-k.webp`},
   {key:'letter-a',label:'A',asset:`${root}symbols/letter-a.webp`},
   {key:'wild',label:'WILD',asset:`${root}symbols/wild.webp`,animationFrames:[`${root}symbols/wild.webp`,`${root}symbols/wild-2.webp`,`${root}symbols/wild-3.webp`]},
   {key:'scatter',label:'SCATTER',asset:`${root}symbols/scatter.webp`},
   {key:'bonus',label:'BONUS CHEST',asset:`${root}symbols/bonus-chest.webp`}
  ],
  visual:{symbolScale:.90,symbolScaleY:1,symbolFit:'cell-width',reelPerspective:.015},
  defaults:{balance:1000,bet:25,jackpot:0,lines:10,minBet:25,maxBet:500,betStep:25,minLines:10,maxLines:10,lineStep:5,jackpotContributionRate:0,minimumJackpotContribution:0,bigWinBetMultiplier:1000,lowWinBetMultiplier:1000,freeSpins:0},
  specialSymbols:{wild:'wild',scatter:'scatter',bonus:'bonus',animatedWin:'good-girl'},
  rules:{cols:5,rows:3,payoutScale:1,paylines:[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,0,1]],lineColors:['#f5d47b','#64d9e8','#ff6b75','#b690ff','#f8aa52','#b9e887','#6dc0ff','#ff8ac5','#ffdf63','#82f0d5'],symbolWeights:[40,40,45,45,55,65,70,100,100,100,100,90,90,35,15,10],weightTotal:1000,paytableCounts:[3,4,5],minimumMatch:3,specialMinimumMatch:3,paytable:{0:{3:2,4:5,5:15},1:{3:2,4:5,5:15},2:{3:1.5,4:4,5:12},3:{3:1.5,4:4,5:12},4:{3:1,4:3,5:8},5:{3:1,4:3,5:8},6:{3:.8,4:2,5:6},7:{3:.5,4:1.5,5:5},8:{3:.5,4:1.5,5:5},9:{3:.5,4:1.5,5:5},10:{3:.5,4:1.5,5:5},11:{3:.5,4:1.5,5:5},12:{3:.5,4:1.5,5:5},13:{5:20},14:{3:1,4:2,5:5},15:{}},bonusFreeSpins:{},paytableOrder:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]},
  features:{allowFreeSpinRetrigger:false},
  ui:{name:'Good Girl Bad Girl · Prototipo',numberLocale:'es-AR',scatterPaytableLabel:'{label}',freeSpinsSuffix:'giros gratis',paytableMultiplierSuffix:'×',paytableMultiplierPrecision:1,announcementAlt:'',frameAlt:'Good Girl Bad Girl — pantalla principal',bigWinAlt:'',lowWinAlt:'',paytableBrand:'GOOD GIRL BAD GIRL',paytableTitle:'Tabla de premios (demo)',paytableSubtitle:'Valores provisionales de demostración; no son los pagos originales',paytableSymbolHeader:'Símbolo',rulesTitle:'NOTAS DEL PROTOTIPO',spinLabel:'Girar',menuLabel:'INFO',loadingLabel:'Cargando',lowWinTitle:'¡PREMIO!',labels:{balance:'SALDO',bet:'APUESTA',lines:'LÍNEAS',win:'PREMIO',jackpot:'JACKPOT'},messages:{autoSpin:'AUTO',stopAutoSpin:'PARAR',stopAutoSpinOverlay:'PARAR AUTO',insufficientBalance:'SALDO INSUFICIENTE',bonusAward:'',scatterAward:'PREMIO SCATTER: {amount}',prize:'PREMIO: {amount}'},paytableRules:['Pagos provisionales de demostración; no son la tabla de pagos original.','No se afirma un RTP. Falta incorporar las reglas originales de giros gratis, Money Wheel y Click Mes.','La imagen trae los controles dibujados; las zonas transparentes activan los botones disponibles.']},
  colors:{accent:'#f2d484',glow:'#d47b44',highlight:'#fff2c6',panel:'#120c10',particlePalette:['#ffdc91','#ef9b5a','#f8e5be','#a4d8ff','#ff735f'],lowWinParticlePalette:['#ffdb90','#f8b66f','#fff4cf','#ee7c5f'],winningTint:'#fff1bd'}
 };
})();
