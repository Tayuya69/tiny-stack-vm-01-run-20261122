import*as f from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T=`!2R%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`;
const B=[(a,b)=>(a+b)|0,(a,b)=>(a-b)|0,Math.imul,(a,b)=>(a/b)|0,(a,b)=>a%b|0,(a,b)=>(a>>>0)/(b>>>0)|0,(a,b)=>(a>>>0)%(b>>>0)|0,0,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,0,(a,b)=>a<<b,(a,b)=>a>>b,(a,b)=>(a>>>b)|0,0,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
function run(P,Q){
 const n=P.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
 let s=0,c=0,pc=0,t=0,ip=0;
 const fin=e=>[Buffer.from(o),e];
 try{for(;;){
  if(t==1e6||pc<0||pc>=n)throw t==1e6?10:9;
  const op=P[pc];
  if(op>83||T[op]==' ')throw 5;
  const v=T.charCodeAt(op)-33,m=[0,1,2,4][v>>4],p=v>>2&3,q=v&3;
  if(pc+m>=n)throw 9;
  t++;
  if(s<p||s-p+q>256)throw s<p?2:3;
  pc+=1+m;
  if(!op)return fin(0);
  if(op==1)D[s++]=(P[pc-1]<<24)>>24;
  else if(op==2)D[s++]=P[pc-4]|P[pc-3]<<8|P[pc-2]<<16|P[pc-1]<<24;
  else if(op==3)s--;
  else if(op==4){D[s]=D[s-1];s++;}
  else if(op==5){const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;}
  else if(op==6){D[s]=D[s-2];s++;}
  else if(op==7){const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;}
  else if(op==23)D[s-1]=-D[s-1]|0;
  else if(op==27)D[s-1]=~D[s-1];
  else if(op>15&&op<35){
   const b=D[s-1],a=D[s-2];
   if(op>18&&op<23&&!b)throw 4;
   s-=2;D[s++]=B[op-16](a,b);
  }
  else if(op>47&&op<53){
   if(op<51){
    const r=((P[pc-2]|P[pc-1]<<8)<<16)>>16,v=op==48?0:D[--s];
    if(op==48||(op==49)==(v==0))pc+=r;
   }else if(op==51){if(c==64)throw 7;C[c++]=pc;pc=P[pc-2]|P[pc-1]<<8;}
   else{if(!c)throw 8;pc=C[--c];}
  }
  else if(op==64){const a=D[s-1];if(a<0||a>255)throw 6;D[s-1]=M[a];}
  else if(op==65){const a=D[s-1],z=D[s-2];if(a<0||a>255)throw 6;s-=2;M[a]=z;}
  else if(op==80){const b=Buffer.from(''+D[s-1]);if(o.length+b.length>65536)throw 11;s--;o.push(...b);}
  else if(op==81){if(o.length>=65536)throw 11;o.push(D[--s]&255);}
  else if(op==82)D[s++]=ip<Q.length?Q[ip++]:-1;
  else return fin(D[--s]&255);
 }}catch(e){return fin(e);}
}
for(const id of f.readdirSync(I).sort()){
 const r=run(f.readFileSync(`${I}/${id}/program.bin`),f.readFileSync(`${I}/${id}/input.bin`));
 f.mkdirSync(`${O}/${id}`,{recursive:true});
 f.writeFileSync(`${O}/${id}/stdout.bin`,r[0]);
 f.writeFileSync(`${O}/${id}/exit.txt`,r[1]+'\n');
}
