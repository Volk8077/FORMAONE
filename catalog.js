'use strict';
(() => {
 const colors = [
 ['lukewarm','Lukewarm','Light blue','#A9D0E5',0],['moonmilk','Moonmilk','Warm ivory','#EDE7DA',0],['afterhours','Afterhours','Soft black','#27282D',0],['cloudline','Cloudline','Cool gray','#B7BEC6',0],['dune-letter','Dune Letter','Sand beige','#C7AC89',0],['moss-hour','Moss Hour','Muted green','#718572',0],['deep-current','Deep Current','Navy blue','#263E59',0],['rose-static','Rose Static','Dusty pink','#C9929D',0],['ember-clay','Ember Clay','Terracotta','#B96E52',0],['violet-hour','Violet Hour','Lavender','#A89CC7',0],['saffron-dusk','Saffron Dusk','Golden ochre','#C99B39',35000],['tidal-jade','Tidal Jade','Deep teal','#347E79',35000]
 ].map(([id,name,description,hex,price])=>({id,name,description,hex,price}));
 const sizes=[{id:'cabin-20',name:'Cabin',inch:20,price:1090000},{id:'checkin-24',name:'Check-in Medium',inch:24,price:1390000},{id:'checkin-28',name:'Check-in Large',inch:28,price:1690000}];
 const groups=[['front','Front shell'],['rear','Rear shell'],['wheels','Wheel covers'],['handles','Handle accents'],['trim','Perimeter trim'],['lining','Interior lining'],['badge','Personal badge']];
 const upgrades={material:[['pc','Satin polycarbonate',0],['aluminum','Brushed aluminum',500000]],wheelType:[['standard','Standard wheels',0],['premium','Five-spoke wheel assembly',90000]],handleType:[['standard','Smooth handle',0],['premium','Contoured ribbed grip',60000]],interior:[['standard','Classic divider',0],['organizer','Organizer interior',80000]]};
 const defaults=()=>({size:'cabin-20',material:'pc',front:'moonmilk',rear:'moonmilk',wheels:'afterhours',handles:'dune-letter',trim:'dune-letter',lining:'moonmilk',badge:'afterhours',wheelType:'standard',handleType:'standard',interior:'standard',initials:''});
 const color=id=>colors.find(c=>c.id===id);
 const valid=c=>!!c && sizes.some(x=>x.id===c.size) && groups.every(([k])=>!!color(c[k])) && Object.entries(upgrades).every(([k,v])=>v.some(x=>x[0]===c[k])) && typeof c.initials==='string' && /^[A-Z]{0,3}$/.test(c.initials);
 const priceItems=c=>{if(!valid(c))throw new Error('Invalid configuration');return [{name:sizes.find(s=>s.id===c.size).name,price:sizes.find(s=>s.id===c.size).price},...Object.entries(upgrades).map(([k,v])=>{const u=v.find(x=>x[0]===c[k]);return{name:u[1],price:u[2]}}).filter(x=>x.price),...groups.filter(([k])=>color(c[k]).price).map(([k,label])=>({name:label+' · '+color(c[k]).name,price:color(c[k]).price})),...(c.initials?[{name:'Personal initials',price:40000}]:[])];};
 const price=c=>priceItems(c).reduce((n,x)=>n+x.price,0);
 const key=c=>JSON.stringify(Object.keys(defaults()).map(k=>c[k]));
 const money=n=>new Intl.NumberFormat('en-TH',{style:'currency',currency:'THB',maximumFractionDigits:0}).format(n/100);
 const api={colors,sizes,groups,upgrades,defaults,color,valid,price,priceItems,key,money};
 if(typeof module!=='undefined')module.exports=api;else window.Catalog=api;
})();
