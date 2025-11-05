<script lang="ts">
  import { goto } from "$app/navigation";
  import Loader from "$lib/components/Loader.svelte";
  import { loginApi } from "$lib/services/auth.api";

  let loading: boolean = $state(false);
  let apiError: string = $state("");
  let email: string = $state("");
  let password: string = $state("");
  let emailError: string = $state("");
  let passwordError: string = $state("");
  let isEmailTouched: boolean = $state(false);
  let isPasswordTouched: boolean = $state(false);

  function validateEmail() {
    if (!email.trim()) {
      emailError = "Email is required";
    } else {
      emailError = "";
    }
  }

  function validatePassword() {
    if (!password.trim()) {
      passwordError = "Password is required";
    } else {
      passwordError = "";
    }
  }

  function handleEmailBlur() {
    isEmailTouched = true;
    validateEmail();
  }

  function handlePasswordBlur() {
    isPasswordTouched = true;
    validatePassword();
  }

  const isFormValid = $derived(!emailError && !passwordError && email.trim() && password.trim())

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    validateEmail()
    validatePassword()
    if(!isFormValid) return

    try {
      loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const result = await loginApi(email, password);
      if (result.Ok) {
        localStorage.setItem("access_token", result.accessToken);
        localStorage.setItem("refresh_token", result.refreshToken);
        goto("/profile");
      } else {
        apiError = "Login failed. Please try again.";
      }
    } catch (error) {
      loading = false;
      console.log("Failed login "), error;
    } finally {
      loading = false;
    }
  };
</script>

<div class="container">
  <form class="login" onsubmit={handleSubmit}>
    <div class="header">
      <h2>Welcome Back!</h2>
      <p>Please log in to continue</p>
    </div>

    <div class="form-group">
      <input
        type="text"
        placeholder="Email"
        bind:value={email}
        oninput={validateEmail}
        onblur={handleEmailBlur}
      />
      {#if isEmailTouched && emailError}
        <p style="color: red;">{emailError}</p>
      {/if}
    </div>

    <div class="form-group">
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
        oninput={validatePassword}
        onblur={handlePasswordBlur}
      />
      {#if isPasswordTouched && passwordError}
        <p style="color: red;">{passwordError}</p>
      {/if}
    </div>
    <a href="/forgot-password" class="forgot-link">Forgot your password?</a>

    <button type="submit" class="submit-btn" disabled={!isFormValid || loading}>
      {#if loading}
        <Loader />
      {:else}
        Log In
      {/if}
    </button>
    <div class="divider">
      <span>or</span>
    </div>

    <div class="links">
      <p>Don't have an account? <a href="/register">Sign up</a></p>
    </div>
  </form>
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

  .login {
    width: 100%;
    max-width: 420px;
    padding: 48px 40px;
    border-radius: 16px;
    background: var(--card-color);
    animation: slideUp 0.5s ease-out;
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

  .login h2 {
    margin: 0 0 8px;
    font-size: 32px;
    font-weight: 700;
  }

  .login p {
    margin: 0;
    font-size: 15px;
    color: var(--secondary-font-color);
  }

  .form-group {
    margin-bottom: 20px;
  }

  .login input {
    width: 100%;
    display: block;
    box-sizing: border-box;
    padding: 14px 16px;
    font-size: 15px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    background-color: #181f25;
    transition: all 0.3s ease;
    font-family: inherit;
    color: var(--primary-font-color);
  }

  .login input:focus {
    outline: none;
  }

  .login input::placeholder {
    color: var(--secondary-font-color);
  }

  .forgot-link {
    display: inline-block;
    margin-bottom: 24px;
    font-size: 14px;
    color: var(--accent-one);
    text-decoration: none;
    transition: color 0.2s;
    
  }

  .forgot-link:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 5px;
    background: var(--accent-one);
    color: white;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    transform: none;
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 28px 0;
  }

  .divider::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: var(--border-color);
  }

  .divider span {
    position: relative;
    display: inline-block;
    padding: 0 16px;
    background: var(--card-color);
    color: #a0aec0;
    font-size: 14px;
  }

  .links {
    text-align: center;
  }

  .links p {
    margin: 0;
    font-size: 14px;
  }

  .links a {
    color: var(--accent-one);
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .links a:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .container {
      padding: 16px;
    }

    .login {
      padding: 36px 24px;
    }

    .login h2 {
      font-size: 28px;
    }

    .login input,
    .submit-btn {
      padding: 12px 14px;
      font-size: 14px;
    }
  }

  @media (max-width: 360px) {
    .login {
      padding: 28px 20px;
    }

    .login h2 {
      font-size: 24px;
    }
  }
</style>
