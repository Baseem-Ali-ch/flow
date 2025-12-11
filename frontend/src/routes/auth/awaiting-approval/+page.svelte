<div class="container">
  <div class="card">
    <div class="header">
      <div class="icon-placeholder">
        <img src="\icons\clock.svg" alt="Email Icon" />
      </div>

      <h2>Awaiting Approval</h2>
      <p>
        Your account has been created and is now awaiting approval from an
        administrator or manager. You will receive an email once your account has been
        approved or contact your administrator or manager.
      </p>
    </div>

    <div class="footer">
      <div class="button-group">
        <a href="/auth/login" class="back-to-login">Back to Login</a>
      </div>
    </div>
  </div>
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

  .footer a {
    padding: 0.6em;
    border-radius: 5px;
    border: none;
    text-decoration: none;
    transition: all 0.3s ease;
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
