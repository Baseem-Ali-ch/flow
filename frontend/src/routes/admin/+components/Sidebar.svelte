<aside class="sidebar">
  <nav>
    <h1>Sidebar</h1>
    <ul>
      <li><a href="/admin/dashboard">Dashboard</a></li>
      <li><a href="/admin/users">Users</a></li>
      <li><a href="#">Tasks</a></li>
      <li><a href="#">Reports</a></li>
    </ul>
  </nav>
</aside>

<style>
  .sidebar {
    position: fixed;
    top: 64px;
    left: 0;
    width: 200px;
    height: calc(100vh - 64px);
    background: var(--background-color);
    padding: 2rem 1rem;
    overflow-y: auto;
    z-index: 50;
    border-right: 1px solid var(--border-color);
  }

  .sidebar h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: var(--primary-font-color);
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    margin-bottom: 1rem;
  }

  .sidebar a {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--primary-font-color);

    text-decoration: none;
    border-radius: 4px;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  .sidebar a:hover {
    background: #117964;
    color: white;
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none; /* Hide sidebar on mobile, or implement a toggle */
    }
  }
</style>
