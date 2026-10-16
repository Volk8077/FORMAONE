'use strict';
window.ProductPhoto=(()=>{
 let count=0;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const front={
 front:'<path d="M112 437Q110 351 208 350L714 348Q802 350 813 430L816 1247Q811 1286 752 1296L688 1295Q650 1297 636 1338L274 1340Q246 1331 234 1298L216 1280L117 1262Z"/>',
 rear:'<path d="M845 359Q904 377 912 439L918 1256L878 1301L859 1280L861 435Z"/>',
 trim:'<path d="M758 345Q838 350 852 430L854 1232Q851 1304 811 1339L799 1338Q840 1299 841 1230L839 430Q831 366 758 357Z"/>',
 handles:'<path d="M463 35Q560 21 680 30L683 80L464 89Z"/><path d="M402 299Q526 278 655 299L653 329L398 330Z"/><path d="M885 689Q923 689 927 737L925 956L907 979L887 970Z"/>',
 wheels:'<ellipse cx="163" cy="1394" rx="38" ry="43"/><ellipse cx="309" cy="1360" rx="32" ry="29"/><ellipse cx="744" cy="1427" rx="38" ry="43"/><ellipse cx="875" cy="1381" rx="34" ry="43"/>',
 badge:'<rect x="401" y="476" width="81" height="31" rx="3"/>'};
 const rear={
 rear:'<path d="M208 370Q252 343 330 349L820 349Q917 359 920 437L920 1253L832 1273Q805 1282 790 1321L380 1340Q355 1296 322 1287L210 1275Q190 1248 190 1185V449Q189 398 208 370Z"/>',
 front:'<path d="M113 433Q114 381 164 361L180 365Q152 410 152 460L151 1240L125 1249L107 1231Z"/>',
 trim:'<path d="M210 345Q160 371 156 436L155 1237Q154 1307 204 1340L215 1335Q168 1300 169 1235L170 439Q171 382 217 358Z"/>',
 handles:'<path d="M445 31L677 31L676 81L448 81Z"/><path d="M442 304Q517 289 638 305L636 334L442 328Z"/><path d="M112 688L134 684L145 718L144 969L115 984Z"/>',
 wheels:'<ellipse cx="158" cy="1366" rx="35" ry="40"/><ellipse cx="284" cy="1416" rx="39" ry="46"/><ellipse cx="748" cy="1343" rx="32" ry="36"/><ellipse cx="888" cy="1391" rx="37" ry="45"/>'};
 const inside={lining:'<rect x="100" y="65" width="605" height="789" rx="60"/><rect x="807" y="65" width="622" height="788" rx="60"/>',trim:'<path fill-rule="evenodd" clip-rule="evenodd" d="M150 37H654Q737 37 737 120V811Q737 890 654 890H150Q69 890 69 811V120Q69 37 150 37ZM150 49Q82 49 82 120V811Q82 878 150 878H654Q724 878 724 811V120Q724 49 654 49Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M871 38H1374Q1461 38 1461 121V811Q1461 891 1374 891H871Q783 891 783 811V121Q783 38 871 38ZM871 51Q796 51 796 121V811Q796 878 871 878H1374Q1448 878 1448 811V121Q1448 51 1374 51Z"/>',handles:'<path d="M1471 363L1492 364L1505 399L1502 602L1472 622Z"/>',wheels:'<ellipse cx="111" cy="945" rx="32" ry="34"/><ellipse cx="661" cy="946" rx="34" ry="34"/><ellipse cx="831" cy="944" rx="33" ry="35"/><ellipse cx="1413" cy="943" rx="34" ry="34"/>'};

 // Photo-space calibration: each hub has its own perspective and occlusion.
 // Keep geometry independent of colour and future material/finish choices.
 const hubs={front:[[162,1395,34,39],[308,1354,30,32,1341],[743,1428,37,40],[876,1376,33,38]],back:[[160,1368,34,38],[302,1420,37,42],[744,1347,30,35,1341],[891,1388,34,39]],interior:[[110,947,32,32],[675,947,33,32],[836,947,32,32],[1409,947,32,32]]};
 function wheelMasks(list){return list.map(([x,y,rx,ry,top])=>top?`<path d="M${x-rx*Math.sqrt(1-((top-y)/ry)**2)} ${top}A${rx} ${ry} 0 1 0 ${x+rx*Math.sqrt(1-((top-y)/ry)**2)} ${top}Z"/>`:`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`).join('')}
 front.wheels=wheelMasks(hubs.front);rear.wheels=wheelMasks(hubs.back);inside.wheels=wheelMasks(hubs.interior);
 // Thin seam inlays follow the photographed frame. Hardware stays uncoloured.
 front.trim='<path d="M758 344Q845 349 848 435M848 570L848 1098M847 1245Q842 1314 808 1338" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>';
 rear.trim='<path d="M231 341Q167 351 164 434M164 568V1100M166 1230Q171 1315 220 1340" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>';
 inside.trim='<path d="M145 44H648Q729 44 729 124V801Q729 868 658 876L631 878Q617 886 603 886H188Q179 885 170 879L141 876Q77 869 77 803V125Q77 51 145 44ZM861 44H1371Q1453 44 1453 124V801Q1453 868 1382 876L1355 878Q1341 886 1327 886H912Q903 885 894 879L865 876Q789 869 789 803V125Q789 51 861 44Z" fill="none" stroke="white" stroke-width="5" stroke-linejoin="round"/>';
 function premiumHubs(list,id,colour){return `<g data-upgrade="premium-wheel" clip-path="url(#${id}-wheels-mask)">${list.map(([x,y,rx,ry])=>`<g transform="translate(${x} ${y}) scale(${rx} ${ry})"><circle r=".97" fill="url(#${id}-hub-metal)"/><circle r=".83" fill="#202326"/><circle r=".76" fill="none" stroke="${colour}" stroke-width=".10"/>${Array.from({length:5},(_,i)=>`<path d="M-.11-.16L-.10-.70Q0-.80 .10-.70L.12-.15Z" transform="rotate(${i*72})" fill="${colour}"/>`).join('')}<circle r=".22" fill="url(#${id}-hub-metal)"/><circle r=".09" fill="#44484b"/><circle r=".93" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width=".025"/><circle r=".88" fill="url(#${id}-hub-light)"/></g>`).join('')}</g>`}

 function render(c,view='front',label='Configured FORMA suitcase',options={}){
  const C=window.Catalog,id='photo'+(++count),interior=view==='interior',back=view==='back',detail=view==='detail';
  const w=interior?1536:1024,h=interior?1024:1536,src='assets/case-'+(interior?(c.interior==='organizer'?'organizer':'interior'):back?'rear':'front')+'.png';
  const masks=interior?inside:back?rear:front,scale=options.fullScale||detail||interior?1:c.size==='cabin-20'?.86:c.size==='checkin-24'?.94:1;
  let defs=`<linearGradient id="${id}-hub-metal" x2="1" y2="1"><stop stop-color="#eee"/><stop offset=".45" stop-color="#81878b"/><stop offset=".7" stop-color="#e3e5e5"/><stop offset="1" stop-color="#555b60"/></linearGradient><linearGradient id="${id}-hub-light" x2=".7" y2="1"><stop stop-color="white" stop-opacity=".23"/><stop offset=".5" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="black" stop-opacity=".25"/></linearGradient>`,layers='';
  for(const [key,shape]of Object.entries(masks)){
   const color=C.color(c[key]),rgb=color.hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255);
   defs+=`${key==='trim'?`<mask id="${id}-${key}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">${shape}${interior?'<rect x="710" y="110" width="97" height="704" fill="black"/>':``}</mask>`:`<clipPath id="${id}-${key}-mask">${shape}</clipPath>`}<filter id="${id}-${key}-tint" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer>${['R','G','B'].map((ch,i)=>`<feFunc${ch} type="linear" slope="${rgb[i]*1.24}" intercept="0.015"/>`).join('')}</feComponentTransfer></filter>`;
   layers+=`<image data-part="${key}" data-color="${color.hex}" href="${src}" width="${w}" height="${h}" ${key==='trim'?'mask':'clip-path'}="url(#${id}-${key}-mask)" filter="url(#${id}-${key}-tint)"/>`;
  }
  const badge= C.color(c.badge).hex,lum=badge.slice(1).match(/../g).map(x=>parseInt(x,16)).reduce((v,n,i)=>v+n*[.299,.587,.114][i],0);
  const text=!back&&!interior?`<text x="442" y="497" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" font-weight="500" letter-spacing="3" fill="${lum>150?'#161616':'#ffffff'}">${escape(c.initials||'FT')}</text>`:'';
  const extras=(c.wheelType==='premium'?premiumHubs(hubs[interior?'interior':back?'back':'front'],id,C.color(c.wheels).hex):'')+(c.handleType==='premium'&&!interior?`<g data-upgrade="textured-grip" opacity=".25" stroke="#202020" stroke-width="2">${Array.from({length:22},(_,i)=>`<path d="M${(back?451:468)+i*9} 40v36"/>`).join('')}</g>`:'')+(interior&&c.interior==='organizer'?'<g data-upgrade="organizer" aria-label="Photographic organizer interior"/>':'');
  return `<svg class="line-art photo-product ${interior?'photo-interior':''}" viewBox="${detail?'330 403 240 180':`0 0 ${w} ${h}`}" role="img" aria-label="${escape(label)}" xmlns="http://www.w3.org/2000/svg"><defs>${defs}<filter id="${id}-finish" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="gamma" amplitude="1" exponent="${c.material==='aluminum'?.8:1.05}"/><feFuncG type="gamma" amplitude="1" exponent="${c.material==='aluminum'?.8:1.05}"/><feFuncB type="gamma" amplitude="1" exponent="${c.material==='aluminum'?.8:1.05}"/></feComponentTransfer></filter></defs><g transform="translate(${w*(1-scale)/2} ${h*(1-scale)}) scale(${scale})" filter="url(#${id}-finish)"><image href="${src}" width="${w}" height="${h}"/>${layers}${extras}${text}</g></svg>`;
 }
 return {render};
})();


