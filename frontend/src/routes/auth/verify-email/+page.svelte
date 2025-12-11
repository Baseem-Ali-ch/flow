<script lang="ts">
  import { goto } from "$app/navigation";
  import { verifyEmailApi } from "$lib/services/auth.api";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Loader from "$lib/components/Loader.svelte";

  let apiError: string = $state("");
  let loading: boolean = $state(false);

  const token = $page.url.searchParams.get("token");

  $effect(() => {
    if (!token) {
      loading = false;
      return;
    }

    emailVerification(token);
  });

  const emailVerification = async (token: string) => {
    try {
      loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await verifyEmailApi(token);
      if (result.message == "Ok") {
        goto("/auth/awaiting-approval");
      } else {
        apiError = !result.success && result.message || "Verifying email is failed.";
        goto("/auth/awaiting-approval");
      }
    } catch (error) {
      loading = false;
      console.log("Failed verifyin email "), error;
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  {#if loading}
    <div class="header">
      <h2 style="margin-bottom: 26px;">
        Your email is verifying. Please wait.
      </h2>
      <Loader />
    </div>
  {:else}
    <div class="card">
      <div class="header">
        <div class="icon-placeholder">
          <img src="\icons\email.svg" alt="Email Icon" />
        </div>

        <h2>Verify Your Email</h2>
        <p>
          We've sent an email to the address you provided. Please click the link
          in the email to verify your account.
        </p>
      </div>

      <div class="footer">
        <p>
          Didn't receive an email? Check your spam folder or request a new one.
        </p>
        {#if apiError}
          <p style="color: red;">{apiError}</p>
        {/if}

        <div class="button-group">
          <button class="resend">Resend Email</button>
          <a href="/auth/login" class="back-to-login">Back to Login</a>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: var(--background-color);
  }

  .card {
    width: 100%;
    max-width: 420px;
    padding: 48px 40px;
    border-radius: 16px;
    background: var(--card-color);
    animation: slideUp 0.5s ease-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
  }

  .icon-placeholder {
    width: 60px;
    height: 60px;
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--input-color);
    border-radius: 50%;
  }

  .icon-placeholder img {
    width: 30px;
    height: 30px;
  }

  .footer {
    text-align: center;
  }

  .button-group {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    justify-content: center;
  }

  .footer button,
  .footer a {
    padding: 0.6em;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer .resend {
    background-color: var(--input-color);
    color: var(--primary-font-color);
  }

  .footer .resend:hover {
    background-color: #ddbe5f;
    color: black;
  }

  .footer .back-to-login {
    background-color: var(--primary-button-color);
    color: white;
  }

  .footer .back-to-login:hover {
    background-color: #03a6a6eb;
  }

  .card h2 {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 700;
  }

  .card p {
    margin: 0;
    font-size: 15px;
    color: var(--secondary-font-color);
  }

  @media (max-width: 480px) {
    .card {
      padding: 36px 24px;
    }

    .card h2 {
      font-size: 26px;
    }

    .icon-placeholder {
      width: 50px;
      height: 50px;
    }

    .icon-placeholder img {
      width: 24px;
      height: 24px;
    }

    .footer button,
    .footer a {
      max-width: 100%;
    }
  }

  @media (max-width: 360px) {
    .card {
      padding: 28px 20px;
    }

    .card h2 {
      font-size: 22px;
    }
  }
</style>
