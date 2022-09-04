<script>
    import { page } from '$app/stores';
</script>
  
  <h1>{$page.status}: {$page.error?.message}</h1>
  <div>Custom error page</div>
  <p>Please contact 02xxxxxx</p>