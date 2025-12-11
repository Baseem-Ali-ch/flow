<script lang="ts">
  import Table from "$lib/components/table/Table.svelte";
  import { getUsers } from "$lib/services/admin.users.api";
  import { onMount } from "svelte";

  interface PendingUsers {
    username: string;
    email: string;
    phone: string;
    isVerified: boolean;
  }

  interface ApprovedUsers {
    username: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: Date;
  }

  const pendingTableColumns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "verified", label: "Verified" },
    { key: "action", label: "Action" },
  ];

  const approvedTableColumns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    { key: "verified", label: "Verified" },
    { key: "joined", label: "Joined" },
    { key: "action", label: "Action" },
  ];

  let pendingUsers = $state<PendingUsers[]>([]);
  let approvedUsers = $state<ApprovedUsers[]>([]);

  let activeTab = $state("pending");
  function switchTab(tabName: string) {
    activeTab = tabName;
  }

  onMount(async () => {
    const result = await getUsers();
    if (result.message == "Ok") {
      pendingUsers = result.data.filter(
        (user: PendingUsers) => !user.isVerified
      );
      approvedUsers = result.data.filter(
        (user: ApprovedUsers) => user.isVerified
      );
    }
  });

  let pendingTableData = $derived(
    pendingUsers.map((u) => ({
      username: u.username,
      email: u.email,
      phone: u.phone,
      verified: u.isVerified ? "Yes" : "No",
      action: "...",
    }))
  );
  $effect(() => {
    console.log("p", pendingTableData);
    console.log("a", approvedTableData);

  });

  let approvedTableData = $derived(
    approvedUsers.map((u) => ({
      username: u.username,
      email: u.email,
      phone: u.phone,
      role: u.role,
      verified: u.isVerified ? "Yes" : "No",
      joined: u.createdAt,
      action: "...",
    }))
  );
</script>

<input type="text" class="search-bar" placeholder="Search..." />

<div class="tab-header">
  <button
    class="tab-button {activeTab === 'pending' ? 'active' : ''}"
    onclick={() => switchTab("pending")}
  >
    Pending
  </button>
  <button
    class="tab-button {activeTab === 'approval' ? 'active' : ''}"
    onclick={() => switchTab("approval")}
  >
    Approval
  </button>
</div>

{#if activeTab === "pending"}
  <div class="tab-content active">
    <Table columns={pendingTableColumns} data={pendingTableData} />
  </div>
{/if}

{#if activeTab === "approval"}
  <div class="tab-content active">
    <Table columns={approvedTableColumns} data={approvedTableData} />
  </div>
{/if}

<style>
  .search-bar {
    width: 94%;
    padding: 12px 20px;
    margin-bottom: 20px;
    background: var(--input-color);
    border: 1px solid var(--border-color);
    color: var(--primary-font-color);
    font-size: 16px;
    border-radius: 4px;
    margin-top: 80px;
    outline: none;
  }

  .search-bar:focus {
    outline: none;
    border-color: var(--accent-two);
    background: var(--accent-one);
  }

  .search-bar::placeholder {
    color: var(--secondary-font-color);
  }

  .tab-header {
    display: flex;
    width: 98%;
    gap: 0;
    margin-bottom: 1em;
    border-bottom: 1px solid var(--border-color);
  }

  .tab-button {
    padding: 12px 30px;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    color: var(--primary-font-color);
    background: none;
    transition: background 200ms;
    text-align: center;
    outline: none;
    border: none;
  }

  .tab-button:hover {
    background: rgba(74, 131, 253, 0.1);
  }

  .tab-button.active {
    border-bottom: 2px solid var(--accent-four);
  }

  .tab-content {
    width: 92%;
    /* padding: 30px; */
    /* background: var(--card-color); */
    /* color: #dfdfdf; */
    /* border-radius: 6px;
    border: 1px solid var(--border-color); */
  }
</style>
