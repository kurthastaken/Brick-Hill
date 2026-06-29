const docs = [
  {
    group: "Get started",
    pages: [
      {
        slug: "home",
        title: "Brick Hill documentation",
        eyebrow: "Overview",
        description: "Everything you need to install, configure and understand this Brick Hill platform built on Laravel 8.",
        tags: ["Laravel 8", "PHP 7.3+", "MySQL", "AGPL-3.0"],
        content: `
          <div class="callout warning"><span class="callout-title">Community project</span><p>This documentation describes the code in the local project. The Brick Hill names and trade marks belong to Mooshimity LTD. This implementation is licensed under AGPL-3.0-or-later.</p></div>
          <p>The project is a complete web platform inspired by Brick Hill. It brings accounts, avatars, games, a shop, forums, clans, messages, trades, moderation and an HTTP API together in one Laravel application.</p>
          <div class="feature-grid">
            <div class="feature-card"><div class="feature-icon">01</div><h3>Straightforward installation</h3><p>Run it locally with Composer, PHP and MySQL, or deploy it to shared hosting.</p></div>
            <div class="feature-card"><div class="feature-icon">02</div><h3>Complete platform</h3><p>Users, economy, inventory, games, clans, forums and an integrated administration panel.</p></div>
            <div class="feature-card"><div class="feature-icon">03</div><h3>Built-in API</h3><p>REST endpoints for users, the shop, games, authentication, inventory and trades.</p></div>
            <div class="feature-card"><div class="feature-icon">04</div><h3>Customisable</h3><p>Configurable themes, domains, currencies, rules and external services.</p></div>
          </div>
          <h2 id="requirements">Requirements <a class="anchor" href="#requirements">#</a></h2>
          <div class="table-wrap"><table><thead><tr><th>Component</th><th>Version / use</th></tr></thead><tbody>
            <tr><td>PHP</td><td><code>^7.3</code> or <code>^8.0</code></td></tr>
            <tr><td>Laravel</td><td><code>8.83.29</code></td></tr>
            <tr><td>Database</td><td>Compatible MySQL or MariaDB server</td></tr>
            <tr><td>Composer</td><td>Installs the PHP dependencies</td></tr>
            <tr><td>Extensions</td><td>OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, Fileinfo and GD</td></tr>
          </tbody></table></div>
          <h2 id="documentation-map">Documentation map <a class="anchor" href="#documentation-map">#</a></h2>
          <p>If this is your first installation, follow <a href="#/local-installation">Local installation</a>. For hosting without SSH, use the <a href="#/infinityfree">InfinityFree</a> guide. Then read <a href="#/configuration">Configuration</a> and <a href="#/first-administrator">First administrator</a>.</p>
          <div class="callout success"><span class="callout-title">Recommended route</span><p>Start locally, confirm that the migrations and sign-in work, and only then prepare the production environment.</p></div>
        `
      },
      {
        slug: "local-installation",
        title: "Local installation",
        eyebrow: "Install",
        description: "Prepare a development environment from scratch and get the application running in a few steps.",
        tags: ["Composer", "Artisan", "MySQL"],
        content: `
          <h2 id="prepare">1. Prepare the project <a class="anchor" href="#prepare">#</a></h2>
          <p>Open a terminal in the Brick-Hill directory and install the dependencies defined in <code>composer.json</code>.</p>
          ${code("PowerShell", `cd "C:\\\\Users\\\\henzo\\\\OneDrive\\\\Documentos\\\\Brick-Hill"\ncomposer install\nCopy-Item .env.example .env\nphp artisan key:generate`)}
          <h2 id="database">2. Create the database <a class="anchor" href="#database">#</a></h2>
          <p>Create an empty MySQL database named <code>brickhill</code>. Then set these values in the <code>.env</code> file:</p>
          ${code(".env", `DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=brickhill\nDB_USERNAME=root\nDB_PASSWORD=`)}
          <h2 id="migrations">3. Run the migrations <a class="anchor" href="#migrations">#</a></h2>
          ${code("Terminal", `php artisan migrate\nphp artisan storage:link\nphp artisan config:clear`)}
          <div class="callout"><span class="callout-title">About storage</span><p>This project serves uploads and thumbnails through <code>/brkcdn</code>. Confirm that <code>public/brkcdn</code> is writable in your environment.</p></div>
          <h2 id="server">4. Start the server <a class="anchor" href="#server">#</a></h2>
          ${code("Terminal", `php artisan serve\n# Open http://127.0.0.1:8000`)}
          <p>With <code>APP_DEBUG=true</code>, detailed errors appear in the browser. Use this only during development.</p>
          <h2 id="checklist">Checklist <a class="anchor" href="#checklist">#</a></h2>
          <ul><li>The home page opens without a 500 error.</li><li>Registration creates an account.</li><li><code>storage/logs/laravel.log</code> shows no recurring failures.</li><li>Images under <code>/brkcdn</code> are accessible.</li></ul>
        `
      },
      {
        slug: "infinityfree",
        title: "Deploy to InfinityFree",
        eyebrow: "Install",
        description: "Prepare the application locally and deploy it to shared hosting without relying on SSH or Composer on the server.",
        tags: ["Production", "InfinityFree", "VistaPanel"],
        content: `
          <div class="callout"><span class="callout-title">How this process works</span><p>As InfinityFree does not normally provide Composer or SSH, the entire project is prepared on your computer and uploaded to <code>htdocs</code>, including <code>vendor</code>.</p></div>
          <div class="steps">
            <div class="step"><h3>Install for production</h3><p>On your local machine, generate the optimised autoloader and create the environment file.</p>${code("Terminal", `composer install --no-dev --optimize-autoloader\nCopy-Item .env.infinityfree.example .env\nphp artisan key:generate`)}</div>
            <div class="step"><h3>Configure VistaPanel</h3><p>Fill in <code>APP_URL</code> and the MySQL host, database name, username and password. Also set a long, random value for <code>INSTALLER_KEY</code>.</p></div>
            <div class="step"><h3>Upload to htdocs</h3><p>Upload <code>app</code>, <code>bootstrap</code>, <code>config</code>, <code>database</code>, <code>public</code>, <code>resources</code>, <code>routes</code>, <code>storage</code>, <code>vendor</code>, <code>.env</code> and <code>.htaccess</code>. Do not upload <code>.git</code>.</p></div>
            <div class="step"><h3>Run the installer</h3><p>Open the key-protected URL, then run the migrations, create the administrator and clear the caches.</p>${code("URL", `https://your-site.infinityfreeapp.com/infinityfree-install.php?key=YOUR_KEY`)}</div>
          </div>
          <h2 id="button-order">Button order <a class="anchor" href="#button-order">#</a></h2>
          <ol><li><strong>Run database migrations</strong></li><li><strong>Create/update admin</strong></li><li><strong>Clear Laravel caches</strong></li></ol>
          <div class="callout warning"><span class="callout-title">Remove the installer</span><p>When finished, delete <code>public/infinityfree-install.php</code> from the server. Leaving an administrative installer publicly available creates an unnecessary security risk.</p></div>
          <h2 id="final-addresses">Final addresses <a class="anchor" href="#final-addresses">#</a></h2>
          ${code("URLs", `Site:  https://your-site.infinityfreeapp.com\nAdmin: https://your-site.infinityfreeapp.com/admin/login.php`)}
          <p>Leave <code>MAIN_SITE_DOMAIN</code> and <code>ADMIN_SITE_DOMAIN</code> empty when everything is hosted on the same domain.</p>
        `
      }
    ]
  },
  {
    group: "Configuration",
    pages: [
      {
        slug: "configuration",
        title: "Configuration",
        eyebrow: "Fundamentals",
        description: "Understand the environment variables that control URLs, the database, sessions, email and rendering.",
        tags: [".env", "Environments", "Services"],
        content: `
          <h2 id="application">Application and URLs <a class="anchor" href="#application">#</a></h2>
          <div class="table-wrap"><table><thead><tr><th>Variable</th><th>Description</th></tr></thead><tbody>
            <tr><td>APP_NAME</td><td>The name displayed by the platform.</td></tr>
            <tr><td>APP_ENV</td><td><code>local</code> during development or <code>production</code> in production.</td></tr>
            <tr><td>APP_DEBUG</td><td>Enables detailed errors. Keep this <code>false</code> on public sites.</td></tr>
            <tr><td>APP_URL</td><td>The canonical URL, without a trailing slash.</td></tr>
            <tr><td>ASSET_URL</td><td>An optional prefix for serving static files from another domain.</td></tr>
            <tr><td>STORAGE_URL</td><td>The public URL for uploads, usually <code>\${APP_URL}/brkcdn</code>.</td></tr>
          </tbody></table></div>
          <h2 id="domains">Domains and administration panel <a class="anchor" href="#domains">#</a></h2>
          <p>The project can place the main site and administration panel on separate domains. For a simple installation, leave both domains empty and use a path prefix.</p>
          ${code(".env", `MAIN_SITE_DOMAIN=\nADMIN_SITE_DOMAIN=\nADMIN_PREFIX=admin`)}
          <h2 id="sessions">Sessions, cache and queues <a class="anchor" href="#sessions">#</a></h2>
          ${code(".env", `CACHE_DRIVER=file\nCACHE_PREFIX=bh_\nQUEUE_CONNECTION=sync\nSESSION_DRIVER=file\nSESSION_LIFETIME=120\nSESSION_SECURE_COOKIE=true`)}
          <div class="callout"><span class="callout-title">Secure cookies</span><p>Use <code>SESSION_SECURE_COOKIE=true</code> only when the site is running over HTTPS.</p></div>
          <h2 id="email">Email <a class="anchor" href="#email">#</a></h2>
          <p>Account verification and password resets use SMTP. Configure the host, port, username, password and sender. During development, the default configuration points to MailHog on port 1025.</p>
          <h2 id="renderer">Renderer <a class="anchor" href="#renderer">#</a></h2>
          <p><code>RENDER_URL</code> and <code>RENDER_KEY</code> connect the application to an external avatar and item rendering service. Without it, some thumbnails will not be generated automatically.</p>
        `
      },
      {
        slug: "database",
        title: "Database",
        eyebrow: "Fundamentals",
        description: "Learn about the platform's main entities and how to maintain the schema with Laravel migrations.",
        tags: ["MySQL", "Eloquent", "Migrations"],
        content: `
          <h2 id="data-model">Data model <a class="anchor" href="#data-model">#</a></h2>
          <p>The schema is built by the migrations in <code>database/migrations</code>. The tables cover every core module:</p>
          <div class="feature-grid">
            <div class="feature-card"><div class="feature-icon">U</div><h3>Users</h3><p>Accounts, settings, avatars, sign-ins, bans, friendships and username history.</p></div>
            <div class="feature-card"><div class="feature-icon">S</div><h3>Shop</h3><p>Items, purchases, inventory, favourites, comments and resellers.</p></div>
            <div class="feature-card"><div class="feature-icon">F</div><h3>Community</h3><p>Forums, messages, statuses, clans, ranks and members.</p></div>
            <div class="feature-card"><div class="feature-icon">G</div><h3>Games</h3><p>Sets, assets, checksums and data used by the client.</p></div>
          </div>
          <h2 id="commands">Essential commands <a class="anchor" href="#commands">#</a></h2>
          ${code("Artisan", `# Apply pending migrations\nphp artisan migrate\n\n# View migration status\nphp artisan migrate:status\n\n# Rebuild the database — development only\nphp artisan migrate:fresh`)}
          <div class="callout warning"><span class="callout-title">Permanent data</span><p><code>migrate:fresh</code> deletes every table. Never use this command in production without a backup and the explicit intention to reset the site.</p></div>
          <h2 id="backup">Backups <a class="anchor" href="#backup">#</a></h2>
          <p>Back up the database and <code>public/brkcdn</code> together. The database stores metadata whilst the directory holds the files; restoring only one of them may leave broken references.</p>
        `
      },
      {
        slug: "first-administrator",
        title: "First administrator",
        eyebrow: "Configuration",
        description: "Create administrative access and understand the moderation areas available in the panel.",
        tags: ["Admin", "Moderation", "Security"],
        content: `
          <h2 id="create-access">Create access <a class="anchor" href="#create-access">#</a></h2>
          <p>In the InfinityFree process, the installer provides a <strong>Create/update admin</strong> action. For local installations, you can achieve the same result by creating the user and staff record according to the <code>User</code> and <code>StaffUser</code> models.</p>
          <div class="callout warning"><span class="callout-title">Protect the panel</span><p>Use a unique password, disable <code>APP_DEBUG</code>, enforce HTTPS and remove the installer as soon as you finish.</p></div>
          <h2 id="available-areas">Available areas <a class="anchor" href="#available-areas">#</a></h2>
          <div class="table-wrap"><table><thead><tr><th>Area</th><th>Purpose</th></tr></thead><tbody>
            <tr><td>/admin/users</td><td>Search, edit, manage and ban users.</td></tr>
            <tr><td>/admin/items</td><td>Inspect and update items.</td></tr>
            <tr><td>/admin/asset-approval</td><td>Approve or reject uploaded assets.</td></tr>
            <tr><td>/admin/reports</td><td>Process community reports.</td></tr>
            <tr><td>/admin/manage/forum-topics</td><td>Create and organise forum topics.</td></tr>
            <tr><td>/admin/manage/staff</td><td>Manage staff members and permissions.</td></tr>
            <tr><td>/admin/manage/site</td><td>Update site settings.</td></tr>
          </tbody></table></div>
          <h2 id="prefix">Change the prefix <a class="anchor" href="#prefix">#</a></h2>
          <p>You can replace <code>admin</code> in <code>ADMIN_PREFIX</code>. After changing any cached configuration, run:</p>
          ${code("Terminal", `php artisan config:clear\nphp artisan route:clear\nphp artisan cache:clear`)}
        `
      }
    ]
  },
  {
    group: "Development",
    pages: [
      {
        slug: "architecture",
        title: "Architecture",
        eyebrow: "Development",
        description: "A practical map of the Laravel application, from routes and controllers to views, models and background tasks.",
        tags: ["MVC", "Laravel", "Structure"],
        content: `
          <h2 id="directories">Main structure <a class="anchor" href="#directories">#</a></h2>
          ${code("Tree", `<span class="tree"><span>app/</span>                 Controllers, Models, Jobs and Middleware\n<span>config/</span>              Platform and service configuration\n<span>database/migrations/</span> Versioned MySQL schema\n<span>public/</span>              Web entry point, CSS, JS, images and brkcdn\n<span>resources/views/</span>     Blade templates for the site and admin panel\n<span>routes/</span>              Web, API and administrative routes\n<span>storage/</span>             Logs, cache, sessions and internal files</span>`, true)}
          <h2 id="request-cycle">Request lifecycle <a class="anchor" href="#request-cycle">#</a></h2>
          <ol><li>The request enters through <code>public/index.php</code>.</li><li>Laravel resolves a route in <code>routes/web.php</code>, <code>api.php</code> or <code>admin.php</code>.</li><li>Middleware checks the session, bans, staff access, maintenance state and limits.</li><li>The controller queries Eloquent models and executes the business rules.</li><li>A Blade view or JSON response is returned to the client.</li></ol>
          <h2 id="modules">Web modules <a class="anchor" href="#modules">#</a></h2>
          <p>The controllers in <code>app/Http/Controllers/Web</code> are organised by domain: authentication, accounts, users, shop, games, forums, clans, awards and information pages. The administration panel lives in <code>Controllers/Admin</code>, whilst the API lives in <code>Controllers/API</code>.</p>
          <h2 id="middleware">Custom middleware <a class="anchor" href="#middleware">#</a></h2>
          <ul><li><code>RedirectIfBanned</code> blocks banned accounts.</li><li><code>RequireStaff</code> and <code>RequireStaffRoute</code> protect the administration area.</li><li><code>FloodCheck</code> limits repeated actions.</li><li><code>GiveDailyCurrency</code> handles the daily reward.</li><li><code>SiteSettingChecker</code> applies global site states.</li><li><code>WordFilterCheck</code> validates text content.</li></ul>
        `
      },
      {
        slug: "assets-and-rendering",
        title: "Assets and rendering",
        eyebrow: "Development",
        description: "Configure uploads, public URLs and the optional rendering service integration.",
        tags: ["brkcdn", "Uploads", "Renderer"],
        content: `
          <h2 id="public-storage">Public storage <a class="anchor" href="#public-storage">#</a></h2>
          <p>Uploaded files and thumbnails are stored in <code>public/brkcdn</code> and served from <code>/brkcdn</code>. The base URL is controlled by <code>STORAGE_URL</code>.</p>
          ${code(".env", `APP_URL=https://example.com\nSTORAGE_URL="\${APP_URL}/brkcdn"\nLOCAL_STORAGE_PATH=`)}
          <h2 id="permissions">Permissions <a class="anchor" href="#permissions">#</a></h2>
          <p>The PHP process user must be able to write to <code>public/brkcdn</code>, <code>storage</code> and <code>bootstrap/cache</code>. On shared hosting, adjust these permissions through the control panel.</p>
          <h2 id="rendering-service">Rendering service <a class="anchor" href="#rendering-service">#</a></h2>
          ${code(".env", `RENDER_URL=https://renderer.example.com\nRENDER_KEY=a-secure-shared-key`)}
          <p>Laravel sends rendering work through the <code>RenderUser</code> job and commands such as <code>RenderUsers</code> and <code>RenderItems</code>. Only the application and renderer should know the shared key.</p>
          <div class="callout"><span class="callout-title">Optional renderer</span><p>The site can operate without <code>RENDER_URL</code>, but avatars and thumbnails that depend on the service will not update automatically.</p></div>
          <h2 id="diagnostics">Diagnostics <a class="anchor" href="#diagnostics">#</a></h2>
          <ul><li>Confirm that the server can reach the renderer URL.</li><li>Check that the key is identical on both sides.</li><li>Look for HTTP errors in <code>storage/logs/laravel.log</code>.</li><li>Check the permissions and free disk space for <code>brkcdn</code>.</li></ul>
        `
      },
      {
        slug: "api",
        title: "HTTP API",
        eyebrow: "Reference",
        description: "Browse the main V1 endpoints exposed by the application and the OpenAPI documentation included with the project.",
        tags: ["REST", "JSON", "OpenAPI 3"],
        content: `
          <h2 id="documentation">Built-in Swagger documentation <a class="anchor" href="#documentation">#</a></h2>
          <p>The specification is stored in <code>public/api-docs/data.json</code>, and the interface is served from <code>/api/docs</code>. The main prefix is <code>/api/v1</code>.</p>
          <h2 id="auth">Authentication <a class="anchor" href="#auth">#</a></h2>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/auth/generateToken</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/auth/verifyToken</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/auth/verifyTokenClient</span></div>
          <p>Token generation requires an authenticated session. Endpoints using the <code>auth</code> middleware must not be treated as public.</p>
          <h2 id="users">Users <a class="anchor" href="#users">#</a></h2>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/user/profile?id={id}</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/user/id?username={username}</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/user/{userId}/sets</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/user/{userId}/crate</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/user/{userId}/owns/{itemId}</span></div>
          <h2 id="shop">Shop <a class="anchor" href="#shop">#</a></h2>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/shop/list</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/shop/{itemId}</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/shop/{itemId}/owners</span></div>
          <div class="endpoint"><span class="method">GET</span><span>/api/v1/shop/{itemId}/recommended</span></div>
          <div class="endpoint"><span class="method post">POST</span><span>/api/shop/render/preview</span></div>
          <h2 id="pagination">Pagination <a class="anchor" href="#pagination">#</a></h2>
          <p>List endpoints accept <code>limit</code> and <code>cursor</code>. The specification allows limits of 1, 10, 25, 50 or 100 results.</p>
          ${code("Example", `curl "https://example.com/api/v1/shop/list?limit=25&type=hat&search=brick"`)}
        `
      }
    ]
  },
  {
    group: "Operations",
    pages: [
      {
        slug: "production",
        title: "Production",
        eyebrow: "Operations",
        description: "Apply the recommended security, performance and maintenance settings before opening the site to the public.",
        tags: ["Deployment", "Security", "Cache"],
        content: `
          <h2 id="secure-environment">Secure configuration <a class="anchor" href="#secure-environment">#</a></h2>
          ${code(".env", `APP_ENV=production\nAPP_DEBUG=false\nLOG_CHANNEL=single\nLOG_LEVEL=error\nSESSION_SECURE_COOKIE=true`)}
          <ul><li>Use HTTPS on every page.</li><li>Replace all example passwords and keys.</li><li>Do not expose the <code>.env</code> file as publicly accessible content.</li><li>Remove installers and diagnostic files.</li><li>Back up the database and uploads regularly.</li></ul>
          <h2 id="optimise">Optimise Laravel <a class="anchor" href="#optimise">#</a></h2>
          ${code("Terminal", `composer install --no-dev --optimize-autoloader\nphp artisan config:cache\nphp artisan route:cache\nphp artisan view:cache`)}
          <p>If you change <code>.env</code> or any configuration files, rebuild the caches so the new values are loaded.</p>
          <h2 id="scheduler">Scheduler <a class="anchor" href="#scheduler">#</a></h2>
          <p>The <code>TakeTimedItemsOffsale</code>, <code>RenderUsers</code> and <code>RenderItems</code> commands are part of normal operation. If your provider supports cron, run the Laravel scheduler every minute.</p>
          ${code("Cron", `* * * * * php /path/to/project/artisan schedule:run > /dev/null 2>&1`)}
          <h2 id="maintenance">Maintenance mode <a class="anchor" href="#maintenance">#</a></h2>
          ${code("Terminal", `php artisan down\n# carry out maintenance\nphp artisan up`)}
        `
      },
      {
        slug: "troubleshooting",
        title: "Troubleshooting",
        eyebrow: "Help",
        description: "Resolve the most common installation, database, cache, permission and rendering errors.",
        tags: ["Logs", "Errors", "Diagnostics"],
        content: `
          <h2 id="error-500">500 error <a class="anchor" href="#error-500">#</a></h2>
          <p>Start with <code>storage/logs/laravel.log</code>. The most common causes are a missing application key, incorrect MySQL credentials, incomplete dependencies and directories without write permission.</p>
          ${code("Terminal", `php artisan config:clear\nphp artisan cache:clear\nphp artisan view:clear\nphp artisan route:clear`)}
          <h2 id="app-key">No application encryption key <a class="anchor" href="#app-key">#</a></h2>
          ${code("Terminal", `php artisan key:generate`)}
          <p>Confirm that the new <code>APP_KEY</code> value was actually saved in <code>.env</code>.</p>
          <h2 id="sql">MySQL connection failure <a class="anchor" href="#sql">#</a></h2>
          <ul><li>Check <code>DB_HOST</code>, which is rarely <code>localhost</code> on shared hosting.</li><li>Confirm the required prefix in the database name and username.</li><li>Make sure the password contains no unintended spaces or quotation marks.</li><li>Clear the configuration cache after editing <code>.env</code>.</li></ul>
          <h2 id="images">Images do not appear <a class="anchor" href="#images">#</a></h2>
          <p>Check <code>APP_URL</code>, <code>STORAGE_URL</code>, that <code>public/brkcdn</code> exists, and its permissions. If only generated thumbnails fail, check the renderer.</p>
          <h2 id="admin">Administration panel returns 404 <a class="anchor" href="#admin">#</a></h2>
          <p>If the administration domains are empty, the panel uses <code>ADMIN_PREFIX</code>. The project's default sign-in path is <code>/admin/login.php</code>. Clear the route and configuration caches after making changes.</p>
          <div class="callout success"><span class="callout-title">Golden rule</span><p>Change one thing at a time, reproduce the issue and return to the log. This is usually faster than changing several settings blindly.</p></div>
        `
      }
    ]
  }
];

function code(label, value, raw = false) {
  const display = raw ? value : escapeHtml(value);
  const copyText = stripHtml(value).replace(/"/g, "&quot;");
  return `<div class="code-block"><div class="code-head"><span>${label}</span><button class="copy-button" type="button" data-copy="${copyText}">Copy</button></div><pre><code>${display}</code></pre></div>`;
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function stripHtml(value) {
  const div = document.createElement("div");
  div.innerHTML = value;
  return div.textContent || "";
}

const pages = docs.flatMap(group => group.pages.map(page => ({ ...page, group: group.group })));
const article = document.querySelector("#docArticle");
const sidebarNav = document.querySelector("#sidebarNav");
const tocNav = document.querySelector("#tocNav");
const pageNav = document.querySelector("#pageNav");
const mainContent = document.querySelector("#mainContent");
const themeToggle = document.querySelector("#themeToggle");
const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector("#overlay");
const menuButton = document.querySelector("#menuButton");
const searchDialog = document.querySelector("#searchDialog");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");
let selectedSearchIndex = 0;
let visibleResults = [];
let headingObserver;

function iconFor(slug) {
  const icons = {
    home: `<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></svg>`,
    "local-installation": `<svg viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M5 20h14"/></svg>`,
    infinityfree: `<svg viewBox="0 0 24 24"><path d="M7 18a5 5 0 1 1 1.8-9.66A6 6 0 0 1 20 11a4 4 0 0 1-1 7H7Z"/><path d="m10 13 2 2 3-4"/></svg>`,
    configuration: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.36.72.6 1 .28.3.67.47 1.1.49H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z"/></svg>`,
    database: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"/></svg>`,
    "first-administrator": `<svg viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.6 2.97 8.65 7 10 4.03-1.35 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
    architecture: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v2h11v-2M12 12v2"/></svg>`,
    "assets-and-rendering": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
    api: `<svg viewBox="0 0 24 24"><path d="m8 9-4 3 4 3m8-6 4 3-4 3M14 5l-4 14"/></svg>`,
    production: `<svg viewBox="0 0 24 24"><path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z"/><path d="m4 7 8 5 8-5M12 12v10"/></svg>`,
    troubleshooting: `<svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-3-3 2.4-2.4Z"/></svg>`
  };
  return icons[slug] || "";
}

function renderSidebar(activeSlug) {
  sidebarNav.innerHTML = docs.map(group => `
    <section class="nav-group">
      <p class="nav-group-title">${group.group}</p>
      ${group.pages.map(page => `<a class="nav-link ${page.slug === activeSlug ? "active" : ""}" href="#/${page.slug}">${iconFor(page.slug)}<span>${page.title}</span></a>`).join("")}
    </section>
  `).join("");
}

function getCurrentSlug() {
  return location.hash.replace(/^#\//, "").split("#")[0] || "home";
}

function renderPage() {
  const slug = getCurrentSlug();
  const pageIndex = Math.max(0, pages.findIndex(page => page.slug === slug));
  const page = pages[pageIndex];
  document.title = `${page.title} | Brick Hill Docs`;
  article.innerHTML = `
    <div class="eyebrow">${page.eyebrow}</div>
    <h1>${page.title}</h1>
    <p class="lead">${page.description}</p>
    <div class="meta-row">${page.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}</div>
    ${page.content}
  `;
  renderSidebar(page.slug);
  renderToc();
  renderPageNav(pageIndex);
  bindCopyButtons();
  closeMobileMenu();
  if (!location.hash.includes("#", 2)) window.scrollTo({ top: 0, behavior: "instant" });
  mainContent.focus({ preventScroll: true });
}

function renderToc() {
  const headings = [...article.querySelectorAll("h2[id], h3[id]")];
  tocNav.innerHTML = headings.map(h => `<a class="toc-link level-${h.tagName.slice(1)}" href="#${h.id}">${h.childNodes[0].textContent.trim()}</a>`).join("");
  if (headingObserver) headingObserver.disconnect();
  headingObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (!visible.length) return;
    document.querySelectorAll(".toc-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${visible[0].target.id}`));
  }, { rootMargin: "-80px 0px -72% 0px" });
  headings.forEach(heading => headingObserver.observe(heading));
}

function renderPageNav(index) {
  const previous = pages[index - 1];
  const next = pages[index + 1];
  pageNav.innerHTML = `
    ${previous ? `<a href="#/${previous.slug}">← Previous<strong>${previous.title}</strong></a>` : "<span></span>"}
    ${next ? `<a class="next" href="#/${next.slug}">Next →<strong>${next.title}</strong></a>` : ""}
  `;
}

function bindCopyButtons() {
  article.querySelectorAll(".copy-button").forEach(button => {
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(button.dataset.copy);
      const toast = document.querySelector("#toast");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1400);
    });
  });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("bh-docs-theme", theme);
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0d1117" : "#ffffff";
}

function openMobileMenu() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

function openSearch() {
  if (!searchDialog.open) searchDialog.showModal();
  searchInput.value = "";
  selectedSearchIndex = 0;
  updateSearch("");
  setTimeout(() => searchInput.focus(), 0);
}

function updateSearch(query) {
  const normalized = query.trim().toLocaleLowerCase("en-GB");
  visibleResults = pages.filter(page => {
    const searchable = `${page.title} ${page.description} ${page.tags.join(" ")} ${stripHtml(page.content)}`.toLocaleLowerCase("en-GB");
    return !normalized || searchable.includes(normalized);
  }).slice(0, 9);
  selectedSearchIndex = Math.min(selectedSearchIndex, Math.max(0, visibleResults.length - 1));
  if (!visibleResults.length) {
    searchResults.innerHTML = `<div class="search-empty">No results for “${escapeHtml(query)}”.<br>Try a term such as API, database or admin.</div>`;
    return;
  }
  searchResults.innerHTML = visibleResults.map((page, index) => `
    <a class="search-result ${index === selectedSearchIndex ? "selected" : ""}" href="#/${page.slug}" data-index="${index}">
      <div class="search-result-title"><span>${page.title}</span><span class="search-result-group">${page.group}</span></div>
      <p>${page.description}</p>
    </a>
  `).join("");
}

document.querySelector("#searchTrigger").addEventListener("click", openSearch);
document.querySelector("#searchClose").addEventListener("click", () => searchDialog.close());
searchInput.addEventListener("input", event => updateSearch(event.target.value));
searchInput.addEventListener("keydown", event => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedSearchIndex = Math.min(selectedSearchIndex + 1, visibleResults.length - 1);
    updateSearch(searchInput.value);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedSearchIndex = Math.max(selectedSearchIndex - 1, 0);
    updateSearch(searchInput.value);
  } else if (event.key === "Enter" && visibleResults[selectedSearchIndex]) {
    location.hash = `#/${visibleResults[selectedSearchIndex].slug}`;
    searchDialog.close();
  }
});
searchResults.addEventListener("click", () => searchDialog.close());
document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  }
});
themeToggle.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
menuButton.addEventListener("click", () => sidebar.classList.contains("open") ? closeMobileMenu() : openMobileMenu());
overlay.addEventListener("click", closeMobileMenu);
window.addEventListener("hashchange", () => {
  if (location.hash.startsWith("#/")) renderPage();
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMobileMenu();
});

const storedTheme = localStorage.getItem("bh-docs-theme");
setTheme(storedTheme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
if (!location.hash.startsWith("#/")) location.hash = "#/home";
renderPage();
