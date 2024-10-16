// rbui-js@1.0.0 downloaded from https://ga.jspm.io/npm:rbui-js@1.0.0-alpha.4/lib/rbui/index.js

import{Controller as e}from"@hotwired/stimulus";import{animate as t}from"motion";import{format as s}from"date-fns";import i from"mustache";import n from"chart.js/auto";import{computePosition as r,flip as a,shift as o,autoUpdate as l,offset as d}from"@floating-ui/dom";import h from"fuse.js";import c from"tippy.js";class AccordionController extends e{static targets=["icon","content"];static values={open:{type:Boolean,default:false},animationDuration:{type:Number,default:.15},animationEasing:{type:String,default:"ease-in-out"},rotateIcon:{type:Number,default:180}};connect(){let e=this.animationDurationValue;this.animationDurationValue=0;this.openValue?this.open():this.close();this.animationDurationValue=e}toggle(){this.openValue=!this.openValue}openValueChanged(e,t){e?this.open():this.close()}open(){if(this.hasContentTarget){this.revealContent();this.hasIconTarget&&this.rotateIcon();this.openValue=true}}close(){if(this.hasContentTarget){this.hideContent();this.hasIconTarget&&this.rotateIcon();this.openValue=false}}revealContent(){const e=this.contentTarget.scrollHeight;t(this.contentTarget,{height:`${e}px`},{duration:this.animationDurationValue,easing:this.animationEasingValue})}hideContent(){t(this.contentTarget,{height:0},{duration:this.animationDurationValue,easing:this.animationEasingValue})}rotateIcon(){t(this.iconTarget,{rotate:`${this.openValue?this.rotateIconValue:0}deg`})}}class AlertDialogController extends e{static targets=["content"];static values={open:{type:Boolean,default:false}};connect(){this.openValue&&this.open()}open(){document.body.insertAdjacentHTML("beforeend",this.contentTarget.innerHTML);document.body.classList.add("overflow-hidden")}dismiss(e){document.body.classList.remove("overflow-hidden");this.element.remove()}}class CalendarController extends e{static targets=["calendar","title","weekdaysTemplate","selectedDateTemplate","todayDateTemplate","currentMonthDateTemplate","otherMonthDateTemplate"];static values={selectedDate:{type:String,default:null},viewDate:{type:String,default:(new Date).toISOString().slice(0,10)},format:{type:String,default:"yyyy-MM-dd"}};static outlets=["rbui--calendar-input"];initialize(){this.updateCalendar()}nextMonth(e){e.preventDefault();this.viewDateValue=this.adjustMonth(1)}prevMonth(e){e.preventDefault();this.viewDateValue=this.adjustMonth(-1)}selectDay(e){e.preventDefault();this.selectedDateValue=e.currentTarget.dataset.day}selectedDateValueChanged(e,t){const s=new Date(this.selectedDateValue);s.setDate(2);this.viewDateValue=s.toISOString().slice(0,10);this.updateCalendar();this.rbuiCalendarInputOutlets.forEach((e=>{const t=this.formatDate(this.selectedDate());e.setValue(t)}))}viewDateValueChanged(e,t){this.updateCalendar()}adjustMonth(e){const t=this.viewDate();t.setDate(2);t.setMonth(t.getMonth()+e);return t.toISOString().slice(0,10)}updateCalendar(){this.titleTarget.textContent=this.monthAndYear();this.calendarTarget.innerHTML=this.calendarHTML()}calendarHTML(){return this.weekdaysTemplateTarget.innerHTML+this.calendarDays()}calendarDays(){return this.getFullWeeksStartAndEndInMonth().map((e=>this.renderWeek(e))).join("")}renderWeek(e){const t=e.map((e=>this.renderDay(e))).join("");return`<tr class="flex w-full mt-2">${t}</tr>`}renderDay(e){const t=new Date;let s="";const n={day:e,dayDate:e.getDate()};s=e.toDateString()===this.selectedDate().toDateString()?i.render(this.selectedDateTemplateTarget.innerHTML,n):e.toDateString()===t.toDateString()?i.render(this.todayDateTemplateTarget.innerHTML,n):e.getMonth()===this.viewDate().getMonth()?i.render(this.currentMonthDateTemplateTarget.innerHTML,n):i.render(this.otherMonthDateTemplateTarget.innerHTML,n);return s}monthAndYear(){const e=this.viewDate().toLocaleString("default",{month:"long"});const t=this.viewDate().getFullYear();return`${e} ${t}`}selectedDate(){return new Date(this.selectedDateValue)}viewDate(){return this.viewDateValue?new Date(this.viewDateValue):this.selectedDate()}getFullWeeksStartAndEndInMonth(){const e=this.viewDate().getMonth();const t=this.viewDate().getFullYear();let s=[],i=new Date(t,e,1),n=new Date(t,e+1,0),r=n.getDate();let a=1;let o;if(i.getDay()===1)o=7;else if(i.getDay()===0){let s=new Date(t,e,0);a=s.getDate()-6+1;o=1}else{let n=new Date(t,e,0);a=n.getDate()+1-i.getDay()+1;o=7-i.getDay()+1;s.push({start:a,end:o});a=o+1;o+=7}while(a<=r){s.push({start:a,end:o});a=o+1;o+=7;o=a===1&&o===8?1:o;if(o>r&&a<=r){o-=r;s.push({start:a,end:o});break}}return s.map((({start:s,end:i},n)=>{const r=+(s>i&&n===0);return Array.from({length:7},((i,n)=>{const a=new Date(t,e-r,s+n);return a}))}))}formatDate(e){return s(e,this.formatValue)}}class CalendarInputController extends e{setValue(e){this.element.value=e}}class CollapsibleController extends e{static targets=["content"];static values={open:{type:Boolean,default:false}};connect(){this.openValue?this.open():this.close()}toggle(){this.openValue=!this.openValue}openValueChanged(e,t){e?this.open():this.close()}open(){if(this.hasContentTarget){this.contentTarget.classList.remove("hidden");this.openValue=true}}close(){if(this.hasContentTarget){this.contentTarget.classList.add("hidden");this.openValue=false}}}class ChartController extends e{static values={options:{type:Object,default:{}}};connect(){this.initDarkModeObserver();this.initChart()}disconnect(){this.darkModeObserver?.disconnect();this.chart?.destroy()}initChart(){this.setColors();const e=this.element.getContext("2d");this.chart=new n(e,this.mergeOptionsWithDefaults())}setColors(){this.setDefaultColorsForChart()}getThemeColor(e){const t=getComputedStyle(document.documentElement).getPropertyValue(`--${e}`);const[s,i,n]=t.split(" ");return`hsl(${s}, ${i}, ${n})`}defaultThemeColor(){return{backgroundColor:this.getThemeColor("background"),hoverBackgroundColor:this.getThemeColor("accent"),borderColor:this.getThemeColor("primary"),borderWidth:1}}setDefaultColorsForChart(){n.defaults.color=this.getThemeColor("muted-foreground");n.defaults.borderColor=this.getThemeColor("border");n.defaults.backgroundColor=this.getThemeColor("background");n.defaults.plugins.tooltip.backgroundColor=this.getThemeColor("background");n.defaults.plugins.tooltip.borderColor=this.getThemeColor("border");n.defaults.plugins.tooltip.titleColor=this.getThemeColor("foreground");n.defaults.plugins.tooltip.bodyColor=this.getThemeColor("muted-foreground");n.defaults.plugins.tooltip.borderWidth=1;n.defaults.plugins.legend.labels.boxWidth=12;n.defaults.plugins.legend.labels.boxHeight=12;n.defaults.plugins.legend.labels.borderWidth=0;n.defaults.plugins.legend.labels.useBorderRadius=true;n.defaults.plugins.legend.labels.borderRadius=this.getThemeColor("radius")}refreshChart(){this.chart?.destroy();this.initChart()}initDarkModeObserver(){this.darkModeObserver=new MutationObserver((()=>{this.refreshChart()}));this.darkModeObserver.observe(document.documentElement,{attributeFilter:["class"]})}mergeOptionsWithDefaults(){return{...this.optionsValue,data:{...this.optionsValue.data,datasets:this.optionsValue.data.datasets.map((e=>({...this.defaultThemeColor(),...e})))}}}}class CheckboxGroupController extends e{static targets=["checkbox"];connect(){this.element.hasAttribute("data-required")&&this.checkboxTargets.forEach((e=>{e.required=true}))}onChange(e){if(this.element.hasAttribute("data-required")){const e=this.checkboxTargets.some((e=>e.checked));this.checkboxTargets.forEach((t=>{t.required=!e}))}}}class ClipboardController extends e{static targets=["trigger","source","successPopover","errorPopover"];static values={options:{type:Object,default:{}}};copy(){let e=this.sourceTarget.children[0];if(!e){this.showErrorPopover();return}let t=e.tagName==="INPUT"?e.value:e.innerText;navigator.clipboard.writeText(t).then((()=>{this.#e()})).catch((()=>{this.#t()}))}onClickOutside(){this.successPopoverTarget.classList.contains("hidden")||this.successPopoverTarget.classList.add("hidden");this.errorPopoverTarget.classList.contains("hidden")||this.errorPopoverTarget.classList.add("hidden")}#s(e){r(this.triggerTarget,e,{placement:this.optionsValue.placement||"top",middleware:[a(),o()]}).then((({x:t,y:s})=>{Object.assign(e.style,{left:`${t}px`,top:`${s}px`})}))}#e(){this.#s(this.successPopoverTarget);this.successPopoverTarget.classList.remove("hidden")}#t(){this.#s(this.errorPopoverTarget);this.errorPopoverTarget.classList.remove("hidden")}}class ComboboxController extends e{static targets=["input","trigger","value","content","search","list","item"];static values={open:Boolean};static outlets=["rbui--combobox-item","rbui--combobox-content"];constructor(...e){super(...e);this.cleanup}connect(){this.#i();this.#n()}disconnect(){this.cleanup()}onTriggerClick(e){e.preventDefault();this.openValue?this.#r():this.#a()}onItemSelected(e){e.preventDefault();this.#o(e.target)}onKeyEnter(e){e.preventDefault();const t=this.itemTargets.find((e=>e.getAttribute("aria-current")==="true"));t||this.#r();this.#o(t)}onSearchInput(e){this.rbuiComboboxContentOutlet.handleSearchInput(e.target.value);this.#l()}onClickOutside(e){if(this.openValue&&!this.element.contains(e.target)){e.preventDefault();this.#r()}}onEscKey(e){e.preventDefault();this.#r()}onKeyDown(e){e.preventDefault();const t=this.itemTargets.findIndex((e=>e.getAttribute("aria-current")==="true"));if(t+1<this.itemTargets.length){this.itemTargets[t].removeAttribute("aria-current");const e=this.itemTargets[t+1];this.#d(e)}}onKeyUp(e){e.preventDefault();const t=this.itemTargets.findIndex((e=>e.getAttribute("aria-current")==="true"));if(t>0){this.itemTargets[t].removeAttribute("aria-current");const e=this.itemTargets[t-1];this.#d(e)}}#r(){this.openValue=false;this.contentTarget.classList.add("hidden");this.triggerTarget.setAttribute("aria-expanded",false);this.triggerTarget.setAttribute("aria-activedescendant",true);this.itemTargets.forEach((e=>e.removeAttribute("aria-current")));this.triggerTarget.focus({preventScroll:true})}#a(){this.openValue=true;this.contentTarget.classList.remove("hidden");this.triggerTarget.setAttribute("aria-expanded",true);this.#l();this.searchTarget.focus({preventScroll:true})}#l(){const e=this.itemTargets.find((e=>e.getAttribute("aria-selected")==="true"));if(e){this.#d(e);return}const t=this.itemTargets.find((e=>!e.classList.contains("hidden")));this.#d(t)}#d(e){if(e){e.setAttribute("aria-current","true");this.triggerTarget.setAttribute("aria-activedescendant",e.getAttribute("id"))}}#o(e){const t=this.inputTarget.value;const s=e.dataset.value;this.rbuiComboboxItemOutlets.forEach((e=>e.handleItemSelected(s)));this.inputTarget.value=e.dataset.value;this.valueTarget.innerText=e.innerText;this.#h(t,s);this.#r()}#h(e,t){if(e===t)return;const s=new InputEvent("change",{bubbles:true,cancelable:true});this.inputTarget.dispatchEvent(s)}#n(){const e=this.listTarget.getAttribute("id");this.triggerTarget.setAttribute("aria-controls",e);this.itemTargets.forEach(((t,s)=>{t.id=`${e}-${s}`}))}#i(){this.cleanup=l(this.triggerTarget,this.contentTarget,(()=>{r(this.triggerTarget,this.contentTarget,{middleware:[d(4)]}).then((({x:e,y:t})=>{Object.assign(this.contentTarget.style,{left:`${e}px`,top:`${t}px`})}))}))}}class ComboboxContentController extends e{static targets=["item","empty","group"];handleSearchInput(e){const t=this.#c(e);this.#u(this.itemTargets,false);const s=this.#g(t);this.#u(s,true);this.#u(this.emptyTargets,s.length===0);this.#p()}#p(){this.groupTargets.forEach((e=>{const t=e.querySelectorAll("[data-rbui--combobox-content-target='item']:not(.hidden)").length>0;this.#u([e],t)}))}#g(e){return this.itemTargets.filter((t=>this.#c(t.innerText).includes(e)))}#u(e,t){e.forEach((e=>e.classList.toggle("hidden",!t)))}#c(e){return e.toLowerCase().trim()}}class ComboboxItemController extends e{handleItemSelected(e){this.element.dataset.value==e?this.element.setAttribute("aria-selected",true):this.element.removeAttribute("aria-selected")}}class CommandController extends e{static targets=["input","group","item","empty","content"];static values={open:{type:Boolean,default:false}};connect(){this.inputTarget.focus();this.searchIndex=this.buildSearchIndex();this.toggleVisibility(this.emptyTargets,false);this.selectedIndex=-1;this.openValue&&this.open()}open(e){e.preventDefault();document.body.insertAdjacentHTML("beforeend",this.contentTarget.innerHTML);document.body.classList.add("overflow-hidden")}dismiss(){document.body.classList.remove("overflow-hidden");console.log("this.element",this.element);this.element.remove()}filter(e){this.deselectAll();const t=e.target.value.toLowerCase();if(t.length===0){this.resetVisibility();return}this.toggleVisibility(this.itemTargets,false);const s=this.searchIndex.search(t);s.forEach((e=>this.toggleVisibility([e.item.element],true)));this.toggleVisibility(this.emptyTargets,s.length===0);this.updateGroupVisibility()}toggleVisibility(e,t){e.forEach((e=>e.classList.toggle("hidden",!t)))}updateGroupVisibility(){this.groupTargets.forEach((e=>{const t=e.querySelectorAll("[data-rbui--command-target='item']:not(.hidden)").length>0;this.toggleVisibility([e],t)}))}resetVisibility(){this.toggleVisibility(this.itemTargets,true);this.toggleVisibility(this.groupTargets,true);this.toggleVisibility(this.emptyTargets,false)}buildSearchIndex(){const e={keys:["value"],threshold:.2,includeMatches:true};const t=this.itemTargets.map((e=>({value:e.dataset.value,element:e})));return new h(t,e)}handleKeydown(e){const t=this.itemTargets.filter((e=>!e.classList.contains("hidden")));if(e.key==="ArrowDown"){e.preventDefault();this.updateSelectedItem(t,1)}else if(e.key==="ArrowUp"){e.preventDefault();this.updateSelectedItem(t,-1)}else if(e.key==="Enter"&&this.selectedIndex!==-1){e.preventDefault();t[this.selectedIndex].click()}}updateSelectedItem(e,t){this.selectedIndex>=0&&this.toggleAriaSelected(e[this.selectedIndex],false);this.selectedIndex+=t;this.selectedIndex<0?this.selectedIndex=e.length-1:this.selectedIndex>=e.length&&(this.selectedIndex=0);this.toggleAriaSelected(e[this.selectedIndex],true)}toggleAriaSelected(e,t){e.setAttribute("aria-selected",t.toString())}deselectAll(){this.itemTargets.forEach((e=>this.toggleAriaSelected(e,false)));this.selectedIndex=-1}}class ContextMenuController extends e{static targets=["trigger","content","menuItem"];static values={options:{type:Object,default:{}},matchWidth:{type:Boolean,default:false}};connect(){this.boundHandleKeydown=this.handleKeydown.bind(this);this.initializeTippy();this.selectedIndex=-1}disconnect(){this.destroyTippy()}initializeTippy(){const e={content:this.contentTarget.innerHTML,allowHTML:true,interactive:true,onShow:e=>{this.matchWidthValue&&this.setContentWidth(e);this.addEventListeners()},onHide:()=>{this.removeEventListeners();this.deselectAll()},popperOptions:{modifiers:[{name:"offset",options:{offset:[0,4]}}]}};const t={...this.optionsValue,...e};this.tippy=c(this.triggerTarget,t)}destroyTippy(){this.tippy&&this.tippy.destroy()}setContentWidth(e){const t=e.popper.querySelector(".tippy-content");t&&(t.style.width=`${e.reference.offsetWidth}px`)}handleContextMenu(e){e.preventDefault();this.open()}open(){this.tippy.show()}close(){this.tippy.hide()}handleKeydown(e){if(this.menuItemTargets.length!==0)if(e.key==="ArrowDown"){e.preventDefault();this.updateSelectedItem(1)}else if(e.key==="ArrowUp"){e.preventDefault();this.updateSelectedItem(-1)}else if(e.key==="Enter"&&this.selectedIndex!==-1){e.preventDefault();this.menuItemTargets[this.selectedIndex].click()}}updateSelectedItem(e){this.menuItemTargets.forEach(((e,t)=>{e.getAttribute("aria-selected")==="true"&&(this.selectedIndex=t)}));this.selectedIndex>=0&&this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],false);this.selectedIndex+=e;this.selectedIndex<0?this.selectedIndex=this.menuItemTargets.length-1:this.selectedIndex>=this.menuItemTargets.length&&(this.selectedIndex=0);this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],true)}toggleAriaSelected(e,t){t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected")}deselectAll(){this.menuItemTargets.forEach((e=>this.toggleAriaSelected(e,false)));this.selectedIndex=-1}addEventListeners(){document.addEventListener("keydown",this.boundHandleKeydown)}removeEventListeners(){document.removeEventListener("keydown",this.boundHandleKeydown)}}class DialogController extends e{static targets=["content"];static values={open:{type:Boolean,default:false}};connect(){this.openValue&&this.open()}open(e){e.preventDefault();document.body.insertAdjacentHTML("beforeend",this.contentTarget.innerHTML);document.body.classList.add("overflow-hidden")}dismiss(){document.body.classList.remove("overflow-hidden");this.element.remove()}}class DropdownMenuController extends e{static targets=["trigger","content","menuItem"];static values={open:{type:Boolean,default:false},options:{type:Object,default:{}}};connect(){this.boundHandleKeydown=this.#m.bind(this);this.selectedIndex=-1}#s(){r(this.triggerTarget,this.contentTarget,{placement:this.optionsValue.placement||"top",middleware:[a(),o(),d(8)]}).then((({x:e,y:t})=>{Object.assign(this.contentTarget.style,{left:`${e}px`,top:`${t}px`})}))}onClickOutside(e){if(this.openValue&&!this.element.contains(e.target)){e.preventDefault();this.close()}}toggle(){this.contentTarget.classList.contains("hidden")?this.#f():this.close()}#f(){this.openValue=true;this.#T();this.#v();this.#s();this.contentTarget.classList.remove("hidden")}close(){this.openValue=false;this.#b();this.contentTarget.classList.add("hidden")}#m(e){if(this.menuItemTargets.length!==0)if(e.key==="ArrowDown"){e.preventDefault();this.#y(1)}else if(e.key==="ArrowUp"){e.preventDefault();this.#y(-1)}else if(e.key==="Enter"&&this.selectedIndex!==-1){e.preventDefault();this.menuItemTargets[this.selectedIndex].click()}}#y(e){this.menuItemTargets.forEach(((e,t)=>{e.getAttribute("aria-selected")==="true"&&(this.selectedIndex=t)}));this.selectedIndex>=0&&this.#C(this.menuItemTargets[this.selectedIndex],false);this.selectedIndex+=e;this.selectedIndex<0?this.selectedIndex=this.menuItemTargets.length-1:this.selectedIndex>=this.menuItemTargets.length&&(this.selectedIndex=0);this.#C(this.menuItemTargets[this.selectedIndex],true)}#C(e,t){t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected")}#T(){this.menuItemTargets.forEach((e=>this.#C(e,false)));this.selectedIndex=-1}#v(){document.addEventListener("keydown",this.boundHandleKeydown)}#b(){document.removeEventListener("keydown",this.boundHandleKeydown)}}class FormFieldController extends e{static targets=["input","error"];static values={shouldValidate:false};connect(){this.errorTarget.textContent?this.shouldValidateValue=true:this.errorTarget.classList.add("hidden")}onInvalid(e){e.preventDefault();this.shouldValidateValue=true;this.#I()}onInput(){this.#I()}onChange(){this.#I()}#I(){if(this.shouldValidateValue)if(this.inputTarget.validity.valid){this.errorTarget.textContent="";this.errorTarget.classList.add("hidden")}else{this.errorTarget.textContent=this.#x();this.errorTarget.classList.remove("hidden")}}#x(){const e=this.inputTarget;const t=this.inputTarget.validationMessage;return e.validity.valueMissing?e.dataset.valueMissing||t:e.validity.badInput?e.dataset.badInput||t:e.validity.patternMismatch?e.dataset.patternMismatch||t:e.validity.rangeOverflow?e.dataset.rangeOverflow||t:e.validity.rangeUnderflow?e.dataset.rangeUnderflow||t:e.validity.stepMismatch?e.dataset.stepMismatch||t:e.validity.tooLong?e.dataset.tooLong||t:e.validity.tooShort?e.dataset.tooShort||t:e.validity.typeMismatch&&e.dataset.typeMismatch||t}}class HoverCardController extends e{static targets=["trigger","content","menuItem"];static values={options:{type:Object,default:{}},matchWidth:{type:Boolean,default:false}};connect(){this.boundHandleKeydown=this.handleKeydown.bind(this);this.initializeTippy();this.selectedIndex=-1}disconnect(){this.destroyTippy()}initializeTippy(){const e={content:this.contentTarget.innerHTML,allowHTML:true,interactive:true,onShow:e=>{this.matchWidthValue&&this.setContentWidth(e);this.addEventListeners()},onHide:()=>{this.removeEventListeners();this.deselectAll()},popperOptions:{modifiers:[{name:"offset",options:{offset:[0,4]}}]}};const t={...this.optionsValue,...e};this.tippy=c(this.triggerTarget,t)}destroyTippy(){this.tippy&&this.tippy.destroy()}setContentWidth(e){const t=e.popper.querySelector(".tippy-content");t&&(t.style.width=`${e.reference.offsetWidth}px`)}handleContextMenu(e){e.preventDefault();this.open()}open(){this.tippy.show()}close(){this.tippy.hide()}handleKeydown(e){if(this.menuItemTargets.length!==0)if(e.key==="ArrowDown"){e.preventDefault();this.updateSelectedItem(1)}else if(e.key==="ArrowUp"){e.preventDefault();this.updateSelectedItem(-1)}else if(e.key==="Enter"&&this.selectedIndex!==-1){e.preventDefault();this.menuItemTargets[this.selectedIndex].click()}}updateSelectedItem(e){this.menuItemTargets.forEach(((e,t)=>{e.getAttribute("aria-selected")==="true"&&(this.selectedIndex=t)}));this.selectedIndex>=0&&this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],false);this.selectedIndex+=e;this.selectedIndex<0?this.selectedIndex=this.menuItemTargets.length-1:this.selectedIndex>=this.menuItemTargets.length&&(this.selectedIndex=0);this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],true)}toggleAriaSelected(e,t){t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected")}deselectAll(){this.menuItemTargets.forEach((e=>this.toggleAriaSelected(e,false)));this.selectedIndex=-1}addEventListeners(){document.addEventListener("keydown",this.boundHandleKeydown)}removeEventListeners(){document.removeEventListener("keydown",this.boundHandleKeydown)}}class PopoverController extends e{static targets=["trigger","content","menuItem"];static values={options:{type:Object,default:{}},matchWidth:{type:Boolean,default:false}};connect(){this.boundHandleKeydown=this.handleKeydown.bind(this);this.initializeTippy();this.selectedIndex=-1}disconnect(){this.destroyTippy()}initializeTippy(){const e={content:this.contentTarget.innerHTML,allowHTML:true,interactive:true,onShow:e=>{this.matchWidthValue&&this.setContentWidth(e);this.addEventListeners()},onHide:()=>{this.removeEventListeners();this.deselectAll()},popperOptions:{modifiers:[{name:"offset",options:{offset:[0,4]}}]}};const t={...this.optionsValue,...e};this.tippy=c(this.triggerTarget,t)}destroyTippy(){this.tippy&&this.tippy.destroy()}setContentWidth(e){const t=e.popper.querySelector(".tippy-content");t&&(t.style.width=`${e.reference.offsetWidth}px`)}handleContextMenu(e){e.preventDefault();this.open()}open(){this.tippy.show()}close(){this.tippy.hide()}handleKeydown(e){if(this.menuItemTargets.length!==0)if(e.key==="ArrowDown"){e.preventDefault();this.updateSelectedItem(1)}else if(e.key==="ArrowUp"){e.preventDefault();this.updateSelectedItem(-1)}else if(e.key==="Enter"&&this.selectedIndex!==-1){e.preventDefault();this.menuItemTargets[this.selectedIndex].click()}}updateSelectedItem(e){this.menuItemTargets.forEach(((e,t)=>{e.getAttribute("aria-selected")==="true"&&(this.selectedIndex=t)}));this.selectedIndex>=0&&this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],false);this.selectedIndex+=e;this.selectedIndex<0?this.selectedIndex=this.menuItemTargets.length-1:this.selectedIndex>=this.menuItemTargets.length&&(this.selectedIndex=0);this.toggleAriaSelected(this.menuItemTargets[this.selectedIndex],true)}toggleAriaSelected(e,t){t?e.setAttribute("aria-selected","true"):e.removeAttribute("aria-selected")}deselectAll(){this.menuItemTargets.forEach((e=>this.toggleAriaSelected(e,false)));this.selectedIndex=-1}addEventListeners(){document.addEventListener("keydown",this.boundHandleKeydown)}removeEventListeners(){document.removeEventListener("keydown",this.boundHandleKeydown)}}class TabsController extends e{static targets=["trigger","content"];static values={active:String};connect(){!this.hasActiveValue&&this.triggerTargets.length>0&&(this.activeValue=this.triggerTargets[0].dataset.value)}show(e){this.activeValue=e.currentTarget.dataset.value}activeValueChanged(e,t){if(e!=""&&e!=t){this.contentTargets.forEach((e=>{e.classList.add("hidden")}));this.triggerTargets.forEach((e=>{e.dataset.state="inactive"}));this.activeContentTarget()&&this.activeContentTarget().classList.remove("hidden");this.activeTriggerTarget().dataset.state="active"}}activeTriggerTarget(){return this.triggerTargets.find((e=>e.dataset.value==this.activeValue))}activeContentTarget(){return this.contentTargets.find((e=>e.dataset.value==this.activeValue))}}class ThemeToggleController extends e{initialize(){this.setTheme()}setTheme(){if(localStorage.theme==="dark"||!("theme"in localStorage)&&window.matchMedia("(prefers-color-scheme: dark)").matches){document.documentElement.classList.add("dark");document.documentElement.classList.remove("light")}else{document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}setLightTheme(){localStorage.theme="light";this.setTheme()}setDarkTheme(){localStorage.theme="dark";this.setTheme()}}class TooltipController extends e{static targets=["trigger","content"];static values={placement:String};constructor(...e){super(...e);this.cleanup}connect(){this.setFloatingElement();const e=this.contentTarget.getAttribute("id");this.triggerTarget.setAttribute("aria-describedby",e)}disconnect(){this.cleanup()}setFloatingElement(){console.log(this.placementValue);this.cleanup=l(this.triggerTarget,this.contentTarget,(()=>{r(this.triggerTarget,this.contentTarget,{placement:this.placementValue,middleware:[d(4)]}).then((({x:e,y:t})=>{Object.assign(this.contentTarget.style,{left:`${e}px`,top:`${t}px`})}))}))}}class SelectController extends e{static targets=["trigger","content","input","value","item"];static values={open:Boolean};static outlets=["rbui--select-item"];constructor(...e){super(...e);this.cleanup}connect(){this.setFloatingElement();this.generateItemsIds()}disconnect(){this.cleanup()}selectItem(e){e.preventDefault();this.rbuiSelectItemOutlets.forEach((t=>t.handleSelectItem(e)));const t=this.inputTarget.value;const s=e.target.dataset.value;this.inputTarget.value=s;this.valueTarget.innerText=e.target.innerText;this.dispatchOnChange(t,s);this.closeContent()}onClick(){this.toogleContent();this.openValue?this.setFocusAndCurrent():this.resetCurrent()}handleKeyDown(e){e.preventDefault();const t=this.itemTargets.findIndex((e=>e.getAttribute("aria-current")==="true"));if(t+1<this.itemTargets.length){this.itemTargets[t].removeAttribute("aria-current");this.setAriaCurrentAndActiveDescendant(t+1)}}handleKeyUp(e){e.preventDefault();const t=this.itemTargets.findIndex((e=>e.getAttribute("aria-current")==="true"));if(t>0){this.itemTargets[t].removeAttribute("aria-current");this.setAriaCurrentAndActiveDescendant(t-1)}}handleEsc(e){e.preventDefault();this.closeContent()}setFocusAndCurrent(){const e=this.itemTargets.find((e=>e.getAttribute("aria-selected")==="true"));if(e){e.focus({preventScroll:true});e.setAttribute("aria-current","true");this.triggerTarget.setAttribute("aria-activedescendant",e.getAttribute("id"))}else{this.itemTarget.focus({preventScroll:true});this.itemTarget.setAttribute("aria-current","true");this.triggerTarget.setAttribute("aria-activedescendant",this.itemTarget.getAttribute("id"))}}resetCurrent(){this.itemTargets.forEach((e=>e.removeAttribute("aria-current")))}clickOutside(e){if(this.openValue&&!this.element.contains(e.target)){e.preventDefault();this.toogleContent()}}toogleContent(){this.openValue=!this.openValue;this.contentTarget.classList.toggle("hidden");this.triggerTarget.setAttribute("aria-expanded",this.openValue)}setFloatingElement(){this.cleanup=l(this.triggerTarget,this.contentTarget,(()=>{r(this.triggerTarget,this.contentTarget,{middleware:[d(4)]}).then((({x:e,y:t})=>{Object.assign(this.contentTarget.style,{left:`${e}px`,top:`${t}px`})}))}))}generateItemsIds(){const e=this.contentTarget.getAttribute("id");this.triggerTarget.setAttribute("aria-controls",e);this.itemTargets.forEach(((t,s)=>{t.id=`${e}-${s}`}))}setAriaCurrentAndActiveDescendant(e){const t=this.itemTargets[e];t.focus({preventScroll:true});t.setAttribute("aria-current","true");this.triggerTarget.setAttribute("aria-activedescendant",t.getAttribute("id"))}closeContent(){this.toogleContent();this.resetCurrent();this.triggerTarget.setAttribute("aria-activedescendant",true);this.triggerTarget.focus({preventScroll:true})}dispatchOnChange(e,t){if(e===t)return;const s=new InputEvent("change",{bubbles:true,cancelable:true});this.inputTarget.dispatchEvent(s)}}class SelectItemController extends e{handleSelectItem({target:e}){this.element.dataset.value==e.dataset.value?this.element.setAttribute("aria-selected",true):this.element.removeAttribute("aria-selected")}}class SheetController extends e{static targets=["content"];open(){document.body.insertAdjacentHTML("beforeend",this.contentTarget.innerHTML)}}class SheetContentController extends e{close(){this.element.remove()}}function initialize(e){const registerIfNotExists=(t,s)=>{e.router.modulesByIdentifier.has(t)||e.register(t,s)};registerIfNotExists("rbui--accordion",AccordionController);registerIfNotExists("rbui--alert-dialog",AlertDialogController);registerIfNotExists("rbui--calendar",CalendarController);registerIfNotExists("rbui--calendar-input",CalendarInputController);registerIfNotExists("rbui--collapsible",CollapsibleController);registerIfNotExists("rbui--chart",ChartController);registerIfNotExists("rbui--checkbox-group",CheckboxGroupController);registerIfNotExists("rbui--clipboard",ClipboardController);registerIfNotExists("rbui--combobox",ComboboxController);registerIfNotExists("rbui--combobox-content",ComboboxContentController);registerIfNotExists("rbui--combobox-item",ComboboxItemController);registerIfNotExists("rbui--command",CommandController);registerIfNotExists("rbui--context-menu",ContextMenuController);registerIfNotExists("rbui--dialog",DialogController);registerIfNotExists("rbui--dropdown-menu",DropdownMenuController);registerIfNotExists("rbui--form-field",FormFieldController);registerIfNotExists("rbui--hover-card",HoverCardController);registerIfNotExists("rbui--popover",PopoverController);registerIfNotExists("rbui--tabs",TabsController);registerIfNotExists("rbui--theme-toggle",ThemeToggleController);registerIfNotExists("rbui--tooltip",TooltipController);registerIfNotExists("rbui--select",SelectController);registerIfNotExists("rbui--select-item",SelectItemController);registerIfNotExists("rbui--sheet",SheetController);registerIfNotExists("rbui--sheet-content",SheetContentController)}const u={initialize:initialize};export{u as default,initialize};
