<script>
  const { columns, data } = $props();
</script>

<table>
  <thead>
    <tr>
      {#each columns as col}
        <th>{col.label}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as d, index}
      <tr>
        {#each columns as col}
          <td>{d[col.key]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 20px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    border-radius: 6px;
  }

  table thead {
    background: #d6ebff;
  }

  table th {
    padding: 15px;
    text-align: left;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-font-color);
    /* border-bottom: 1px solid #4a83fd; */
    border: 1px solid var(--border-color);
  }

  table tbody {
    background: #fff;
  }

  table tbody tr:hover {
    background: #d6ebff;
  }

  table tr:last-child td {
    border-bottom: none;
  }

  table td {
    padding: 15px;
    border-bottom: 1px solid var(--border-color);
    color: var(--primary-font-color);
  }

  .status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    min-width: 70px;
    text-align: center;
    background: rgb(216 220 255 / 58%);
  }

  /* Text color only */
  .status.active {
    color: #22c55e; /* green text */
  }

  .status.inactive {
    color: #ef4444; /* red text */
  }
</style>
