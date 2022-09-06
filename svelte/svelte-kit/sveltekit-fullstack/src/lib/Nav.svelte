<script>
    import {
      Header,
      SideNav,
      SideNavItems,
      SideNavLink,
    } from "carbon-components-svelte";
  
    let isSideNavOpen = false;
  </script>
  
  <Header company="SvelteKit" platformName="Demo" bind:isSideNavOpen>
  </Header>
  
  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink href="/" text="Home" />
      <SideNavLink href="/user" text="User" />
      <SideNavLink href="/about" text="About" />
    </SideNavItems>
  </SideNav>
  
