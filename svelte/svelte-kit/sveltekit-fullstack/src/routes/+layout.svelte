<script>
  import "carbon-components-svelte/css/white.css";

  import Nav from "$lib/Nav.svelte"
  import {
      Content,
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";

</script>
  <Nav/>
  <Content>
    <Grid>
      <Row>
        <Column>
          <slot></slot>
        </Column>
      </Row>
    </Grid>
  </Content>
  
  <hr>
  by Oom
  