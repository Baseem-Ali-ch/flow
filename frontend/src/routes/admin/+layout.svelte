<script>
  import Navbar from "./+components/Navbar.svelte";
  import Sidebar from "./+components/Sidebar.svelte";
</script>

<div class="app-layout">
  <Navbar />
  <Sidebar />
  <main class="main-content">
    <slot />
  </main>
</div>

<style>
  .app-layout {
    min-height: 100vh;
  }

  .main-content {
    margin-left: 233px;
    padding: 2rem;
    min-height: calc(100vh - 64px);
    background-color: var(--secondary-bg-color);
  }

  @media (max-width: 768px) {
    .main-content {
      margin-left: 0;
    }
  }
</style>
