/**
* @file Render autocomplete results
* @partof main.tpl
* @updated 25 February 2013;
* Variables
*   items : (object javascript) Contain found products
*/
{literal}
<script type="text/template" id="searchResultsTemplate">
   <div class="inside-padd">
      <% if (_.keys(items).length > 1) { %>
       <ul class="frame-search-thumbail">
           <% _.each(items, function(item){
           if (item.name != null){%>
           <li>{/literal}
               <!-- Start. Photo Block and name  -->
               <a href="{shop_url('product')}/{literal}<%- item.url %>">
                 <span class="photo">
                       <span class="helper"></span>
                      {/literal}<img src="{base_url()}uploads/shop/{literal}<%- item.smallModImage %>">
                   </span>
                   <span><% print( item.name)  %></span>
              </a>
              <!-- End. Photo Block and name -->
              
              <!-- Start. Product price  -->
                <div class="price price_f-s_16"><span class="f-w_b"><%- Math.round(item.price) %></span>{/literal}{$CS}{literal}</div>
              <!-- End. Product price  -->
           </li>
           <% }
           }) %>
       </ul>
       <!-- Start. Show link see all results if amount products >0  -->
       <div class="btn-form">{/literal}
            <a href="{shop_url('search')}?text={literal}<%- items.queryString %>" {/literal} class="f-s_0">
                <span class="icon-show-all"></span><span class="text-el">{lang('s_all_result')}</span>
           </a>
        </div>{literal}
        <!-- End. Show link  -->
        <% } else {%>    
           {/literal}{echo ShopCore::t(lang('s_not_found'))} {literal}
        <% }%>
    </div>
</script>
{/literal}