import{l as u,o as m,a as L}from"./auth-CbXENMBb.js";import{M as S}from"./mockAPI-BmLKuVrD.js";class M{constructor(e){this.dataSource=e,this.swimmers=[]}async init(){this.swimmers=await this.dataSource.getSwimmers(),this.renderAllSwimmerProfiles()}async updateSwimmerForm(e){document.querySelector(".new-swimmer-form").classList.remove("hide"),document.getElementById("fname").value=e.fname||"",document.getElementById("lname").value=e.lname||"",document.getElementById("birthdate").value=e.birthdate||"",document.getElementById("gender").value=e.gender||"",document.getElementById("50FRSCY").value=e["50FRSCY"]||"",document.getElementById("100FRSCY").value=e["100FRSCY"]||"",document.getElementById("200FRSCY").value=e["200FRSCY"]||"",document.getElementById("500FRSCY").value=e["500FRSCY"]||"",document.getElementById("1000FRSCY").value=e["1000FRSCY"]||"",document.getElementById("1650FRSCY").value=e["1650FRSCY"]||"",document.getElementById("50BKSCY").value=e["50BKSCY"]||"",document.getElementById("100BKSCY").value=e["100BKSCY"]||"",document.getElementById("200BKSCY").value=e["200BKSCY"]||"",document.getElementById("50BRSCY").value=e["50BRSCY"]||"",document.getElementById("100BRSCY").value=e["100BRSCY"]||"",document.getElementById("200BRSCY").value=e["200BRSCY"]||"",document.getElementById("50FLSCY").value=e["50FLSCY"]||"",document.getElementById("100FLSCY").value=e["100FLSCY"]||"",document.getElementById("200FLSCY").value=e["200FLSCY"]||"",document.getElementById("100IMSCY").value=e["100IMSCY"]||"",document.getElementById("200IMSCY").value=e["200IMSCY"]||"",document.getElementById("400IMSCY").value=e["400IMSCY"]||"",document.getElementById("50FRLCM").value=e["50FRLCM"]||"",document.getElementById("100FRLCM").value=e["100FRLCM"]||"",document.getElementById("200FRLCM").value=e["200FRLCM"]||"",document.getElementById("400FRLCM").value=e["400FRLCM"]||"",document.getElementById("800FRLCM").value=e["800FRLCM"]||"",document.getElementById("1500FRLCM").value=e["1500FRLCM"]||"",document.getElementById("50BKLCM").value=e["50BKLCM"]||"",document.getElementById("100BKLCM").value=e["100BKLCM"]||"",document.getElementById("200BKLCM").value=e["200BKLCM"]||"",document.getElementById("50BRLCM").value=e["50BRLCM"]||"",document.getElementById("100BRLCM").value=e["100BRLCM"]||"",document.getElementById("200BRLCM").value=e["200BRLCM"]||"",document.getElementById("50FLLCM").value=e["50FLLCM"]||"",document.getElementById("100FLLCM").value=e["100FLLCM"]||"",document.getElementById("200FLLCM").value=e["200FLLCM"]||"",document.getElementById("100IMLCM").value=e["100IMLCM"]||"",document.getElementById("200IMLCM").value=e["200IMLCM"]||"",document.getElementById("400IMLCM").value=e["400IMLCM"]||""}async saveSwimmerProfile(e){const l=new FormData(e),n=Object.fromEntries(l.entries());if(this.editingSwimmerId)n.id=this.editingSwimmerId,await this.dataSource.updateSwimmer(this.editingSwimmerId,n),await this.init(),this.editingSwimmerId=null;else{n.id=Date.now().toString()+Math.floor(Math.random()*1e3);const a=await this.dataSource.addSwimmer(n);this.swimmers.push(a),this.renderSwimmerProfile(a)}e.reset(),e.classList.add("hide")}renderSwimmerProfile(e){const l=document.getElementById("template-swimmer"),n=r(e);l.appendChild(n)}renderAllSwimmerProfiles(){const e=document.getElementById("template-swimmer");e.innerHTML="",this.swimmers.forEach(l=>this.renderSwimmerProfile(l))}}function r(t){const e=document.createElement("div");e.classList.add("swimmer-profile");const l=new Date,n=new Date(t.birthdate),a=1e3*60*60*24*365.2425;let C=Math.floor((l-n)/a);const d=document.createElement("button");d.textContent="Update Swimmer",d.classList.add("update-swimmer-button"),d.dataset.id=t.id;const o=document.createElement("button");o.textContent="Delete Swimmer",o.classList.add("delete-swimmer-button"),o.dataset.id=t.id;const s=document.createElement("div");return s.classList.add("swimmer-profile-buttons"),s.appendChild(d),s.appendChild(o),e.innerHTML=`
        <h3>Name: ${t.fname} ${t.lname}</h3>
        <h3>Age: ${C}</h3>
        <h3>Birthdate: ${t.birthdate}</h3>
        <h3>Gender: ${t.gender}</h3>
        <h3>Short Course Times: </h3>
        <ul id="short-course-times">
            <li class="times">50 FR SCY: ${t["50FRSCY"]||""}</li>
            <li class="times">100 FR SCY: ${t["100FRSCY"]||""}</li>
            <li class="times">200 FR SCY: ${t["200FRSCY"]||""}</li>
            <li class="times">500 FR SCY: ${t["500FRSCY"]||""}</li>
            <li class="times">1000 FR SCY: ${t["1000FRSCY"]||""}</li>
            <li class="times">1650 FR SCY: ${t["1650FRSCY"]||""}</li>
            <li class="times">50 BK SCY: ${t["50BKSCY"]||""}</li>
            <li class="times">100 BK SCY: ${t["100BKSCY"]||""}</li>
            <li class="times">200 BK SCY: ${t["200BKSCY"]||""}</li>
            <li class="times">50 BR SCY: ${t["50BRSCY"]||""}</li>
            <li class="times">100 BR SCY: ${t["100BRSCY"]||""}</li>
            <li class="times">200 BR SCY: ${t["200BRSCY"]||""}</li>
            <li class="times">50 FL SCY: ${t["50FLSCY"]||""}</li>
            <li class="times">100 FL SCY: ${t["100FLSCY"]||""}</li>
            <li class="times">200 FL SCY: ${t["200FLSCY"]||""}</li>
            <li class="times">100 IM SCY: ${t["100IMSCY"]||""}</li>
            <li class="times">200 IM SCY: ${t["200IMSCY"]||""}</li>
            <li class="times">400 IM SCY: ${t["400IMSCY"]||""}</li>
        </ul>
        <h3>Long Course Times: </h3>
        <ul id="long-course-times">
            <li class="times">50 FR LCM: ${t["50FRLCM"]||""}</li>
            <li class="times">100 FR LCM: ${t["100FRLCM"]||""}</li>
            <li class="times">200 FR LCM: ${t["200FRLCM"]||""}</li>
            <li class="times">400 FR LCM: ${t["400FRLCM"]||""}</li>
            <li class="times">800 FR LCM: ${t["800FRLCM"]||""}</li>
            <li class="times">1500 FR LCM: ${t["1500FRLCM"]||""}</li>
            <li class="times">50 BK LCM: ${t["50BKLCM"]||""}</li>
            <li class="times">100 BK LCM: ${t["100BKLCM"]||""}</li>
            <li class="times">200 BK LCM: ${t["200BKLCM"]||""}</li>
            <li class="times">50 BR LCM: ${t["50BRLCM"]||""}</li>
            <li class="times">100 BR LCM: ${t["100BRLCM"]||""}</li>
            <li class="times">200 BR LCM: ${t["200BRLCM"]||""}</li>
            <li class="times">50 FL LCM: ${t["50FLLCM"]||""}</li>
            <li class="times">100 FL LCM: ${t["100FLLCM"]||""}</li>
            <li class="times">200 FL LCM: ${t["200FLLCM"]||""}</li>
            <li class="times">100 IM LCM: ${t["100IMLCM"]||""}</li>
            <li class="times">200 IM LCM: ${t["200IMLCM"]||""}</li>
            <li class="times">400 IM LCM: ${t["400IMLCM"]||""}</li>
        </ul>`,e.appendChild(s),e}u();const B="https://692f280e91e00bafccd6c5d3.mockapi.io/swim-cut-check/swimmers",c=new S(B),i=new M(c),I=document.querySelector("#logout-button"),F=document.querySelector("#user-email");m(t=>{t?F.textContent=`Account E-mail: ${t.email}`:window.location.href="index.html",i.init()});I.addEventListener("click",async()=>{await L()});document.getElementById("template-swimmer").addEventListener("click",async t=>{if(t.target.classList.contains("delete-swimmer-button")){const e=t.target.dataset.id;try{await fetch(`${c.baseURL}/${e}`,{method:"DELETE"}),i.swimmers=i.swimmers.filter(l=>l.id!==e),i.renderAllSwimmerProfiles()}catch(l){console.error("Failed to delete swimmer: ",l)}}if(t.target.classList.contains("update-swimmer-button")){const e=t.target.dataset.id,l=i.swimmers.find(n=>n.id===e);l&&(i.updateSwimmerForm(l),i.editingSwimmerId=e,document.querySelector(".new-swimmer-form").scrollIntoView({behavior:"smooth"}))}});document.getElementById("add-swimmer").addEventListener("click",()=>{document.querySelector(".new-swimmer-form").classList.toggle("hide"),document.querySelector(".new-swimmer-form").scrollIntoView({behavior:"smooth"})});document.getElementById("new-swimmer-submit").addEventListener("click",async t=>{t.preventDefault();const e=document.querySelector(".new-swimmer-form");await i.saveSwimmerProfile(e)});
