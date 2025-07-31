/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Replace header with static HTML as per requirements

  

  block.innerHTML = `
<div id="banner-blue">
   <div class="container banner js-on">
      <div id="logo-search" class="container js-on">
         <div class="logo logo-msd">
            <a
               href="https://www.msd.govt.nz/"
               class="svg"
               aria-label="Go to Ministry of Social Development website."
            >
               <img
                  src="/media_1154326a37ad395f39db04596054c8650f3369f2a.png?width=2000&format=webply&optimize=medium"
               />
            </a>
         </div>
         <div id="search-mobile-wrap">
            <div id="search-mobile">
               <!-- Start search -->
               <div id="search">
                  <form
                     action="/s/search.html?"
                     id="suggestion_form"
                     method="get"
                     role="search"
                  >
                     <input
                        class="input"
                        type="hidden"
                        id="collection"
                        name="collection"
                        value="msd-studylink-web"
                     />
                     <span
                        class="twitter-typeahead"
                        style="position: relative; display: inline-block"
                        ><input
                           class="input query tt-hint"
                           size="31"
                           type="search"
                           maxlength="200"
                           aria-label="Search StudyLink - When autocomplete results are available use up and down arrows to review and enter to select."
                           aria-haspopup="grid"
                           aria-autocomplete="list"
                           readonly=""
                           spellcheck="false"
                           tabindex="-1"
                           aria-hidden="true"
                           dir="ltr"
                           style="
                              position: absolute;
                              top: 0px;
                              left: 0px;
                              border-color: transparent;
                              box-shadow: none;
                              opacity: 1;
                              background: none 0% 0% / auto repeat scroll
                                 padding-box border-box rgb(242, 242, 242);
                           "
                           id="query-hint" /><input
                           class="input query tt-input"
                           id="query"
                           name="query"
                           size="31"
                           type="search"
                           maxlength="200"
                           aria-label="Search StudyLink - When autocomplete results are available use up and down arrows to review and enter to select."
                           aria-haspopup="grid"
                           aria-autocomplete="list"
                           spellcheck="false"
                           dir="auto"
                           aria-owns="query_listbox"
                           aria-controls="query_listbox"
                           role="combobox"
                           aria-expanded="false"
                           style="
                              position: relative;
                              vertical-align: top;
                              background-color: transparent;
                           " /><span
                           role="status"
                           aria-live="polite"
                           style="
                              position: absolute;
                              padding: 0px;
                              border: 0px;
                              height: 1px;
                              width: 1px;
                              margin-bottom: -1px;
                              margin-right: -1px;
                              overflow: hidden;
                              clip: rect(0px, 0px, 0px, 0px);
                              white-space: nowrap;
                           "
                        ></span>
                        <pre
                           aria-hidden="true"
                           style="
                              position: absolute;
                              visibility: hidden;
                              white-space: pre;
                              font-family: &quot;Fira Sans&quot;, sans-serif;
                              font-size: 13.5936px;
                              font-style: normal;
                              font-variant: normal;
                              font-weight: 400;
                              word-spacing: 0px;
                              letter-spacing: 0.448589px;
                              text-indent: 0px;
                              text-rendering: auto;
                              text-transform: none;
                           "
                        ></pre>
                        <div
                           role="listbox"
                           class="tt-menu"
                           id="query-listbox"
                           style="
                              position: absolute;
                              top: 100%;
                              left: 0px;
                              z-index: 100;
                              display: none;
                           "
                        >
                           <div
                              role="presentation"
                              class="tt-dataset tt-dataset-organic"
                           ></div></div
                     ></span>
                     <input
                        id="search-button"
                        name="Submit"
                        value="submit search"
                        type="submit"
                     />
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="container header-nav js-on">
      <div class="container js-on">
         <!-- Start StudyLink logo -->
         <div class="logo logo-sl">
            <a href="/" class="svg" aria-label="Go to the Studylink home page.">
               <img
                  src="/media_1e7edca126087802efa148decffd6bde50a4177b4.png?width=2000&format=webply&optimize=medium"
                  alt="Studylink | Hoto Akoranga"
               />
            </a>
         </div>
         <div id="print-url" class="print-only">
            <b>Printed from:</b> https://www.studylink.govt.nz/
         </div>
         <div id="print-date"><b>Printed:</b> 31 July 2025</div>

         <nav id="secondary-nav" aria-label="Top">
            <ul>
               <li><a href="/products/a-z-products/">A-Z payments</a></li>
               <li><a href="/products/forms/">Forms</a></li>
            </ul>
            <div class="clearboth"></div>
         </nav>
      </div>
   </div>

   <div class="container primary-nav js-on">
      <div class="container js-on">
         <div id="navigation-float">
            <div id="primarynav" role="navigation" aria-label="Primary">
               <ul>
                  <li class="currentbg">
                     <a href="/" id="home-icon" class="current">
                        <div class="visually-hidden">Home</div>
                     </a>
                  </li>
                  <li><a href="/starting-study/">Starting study</a></li>
                  <li><a href="/in-study/">In study</a></li>
                  <li><a href="/return-to-study/">Returning to study</a></li>
                  <li><a href="/finished-study/">Finished studying</a></li>
               </ul>
               <div class="clearboth"></div>
            </div>

            <div class="mobile-nav-holder">
               <div id="mobile-nav" class="mobile-nav">
                  <ul>
                     <li>
                        <a
                           id="home-icon-mob"
                           title="Go to the Studylink home page."
                           href="/"
                        >
                           <span class="visually-hidden">Home</span>
                        </a>
                     </li>
                     <li>
                        <button
                           id="search-icon"
                           class="hide-nav-item search-icon"
                        >
                           <span class="visually-hidden">Search</span>
                        </button>
                     </li>
                  </ul>
               </div>

               <div id="mobile-search"></div>

               <div class="mobile-nav">
                  <ul>
                     <li>
                        <a id="login" href="/online-services/login/index.html">
                           <span class="visually-hidden">MyStudyLink </span
                           >Login
                        </a>
                     </li>
                     <li>
                        <button class="hide-nav-item nav-icon">
                           <span>Menu</span>
                           <img
                              src="/webadmin/images/nav-icon.svg"
                              alt=""
                              aria-hidden="true"
                           />
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
  `;
}
