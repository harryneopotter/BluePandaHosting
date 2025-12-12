# Technical Features Explained

## Premium Software Stack: What It Actually Means

### LiteSpeed Web Server

**What it is:**  
A high-performance web server that replaces Apache (the industry standard for 25+ years).

**Why it matters:**  
- **40% faster** static content delivery than Apache
- **3-5x better** at handling concurrent connections
- **Built-in caching** (LSCache) that works with WordPress, Joomla, Magento, and more
- **HTTP/3 and QUIC** support for next-generation connection speeds
- **Lower CPU usage** means more resources available for your actual website

**Real-world impact:**  
Your pages load faster, your site handles traffic spikes better, and you rank higher in search engines (Google uses site speed as a ranking factor).

**Retail cost if purchased separately:** $45/month  
**Included in all plans:** ✓

---

### CloudLinux OS

**What it is:**  
A specialized operating system designed specifically for shared hosting that isolates each account into its own protected environment.

**Why it matters:**  
- **Guaranteed resources** • You get your allocated RAM and CPU, period
- **CageFS isolation** • Other sites can't see or affect your files
- **No noisy neighbors** • Poorly optimized sites can't slow down the entire server
- **PHP Selector** • Choose your PHP version per site (5.6 to 8.3)
- **Better security** • Kernel vulnerabilities are compartmentalized

**The problem it solves:**  
Traditional shared hosting: One site gets hacked or has a traffic spike, and 100+ sites slow down or crash. CloudLinux prevents this completely.

**Real-world impact:**  
Consistent performance regardless of what other sites on the server are doing. Your allocated 2GB of RAM is actually yours, not "shared with everyone."

**Retail cost if purchased separately:** $20/month  
**Included in all plans:** ✓

---

### Imunify360 Security Suite

**What it is:**  
An AI-powered security system that provides real-time threat detection, malware scanning, and intrusion prevention.

**Why it matters:**  
- **Proactive defense** • Blocks known malicious IPs before they can attack
- **AI-powered detection** • Learns from attacks across thousands of servers
- **Zero-day protection** • Heuristic analysis catches new, unknown threats
- **Automated malware scanning** • Daily checks with automatic cleanup
- **Real-time monitoring** • Catches attacks as they happen
- **Web application firewall** • Stops common exploits (SQL injection, XSS, etc.)

**The problem it solves:**  
Most hosting companies react to security threats after they happen. Imunify360 stops attacks before they succeed.

**Real-world impact:**  
Your site stays secure without you having to think about it. Automated scans catch malware before it affects your visitors. Known attack sources are blocked automatically.

**Retail cost if purchased separately:** $20/month  
**Included in all plans:** ✓

---

### JetBackup

**What it is:**  
An automated backup system that creates regular snapshots of your entire hosting account—files, databases, email, everything.

**Why it matters:**  
- **Automated scheduling** • Daily to hourly backups depending on plan
- **One-click restoration** • Restore individual files or entire sites
- **Long retention periods** • 14 to 60 days of backup history
- **Incremental backups** • Only changes are backed up (faster, efficient)
- **Remote storage** • Backups stored separately from main server
- **Email backup** • Your mailboxes are backed up too

**The problem it solves:**  
Manual backups are forgotten. Hosting company backups are often incomplete or unavailable when you need them. JetBackup runs automatically and gives you direct access to restore anything.

**Real-world scenarios:**  
- Plugin update breaks your site? Restore to 1 hour ago.
- Accidentally deleted important file? Restore from yesterday.
- Site got hacked 3 days ago? Restore to before the compromise.
- Client wants content from 2 weeks ago? Pull it from backups.

**Retail cost if purchased separately:** $10/month  
**Included in all plans:** ✓

---

### KernelCare

**What it is:**  
Live kernel patching system that applies critical security updates to the Linux kernel without requiring server reboots.

**Why it matters:**  
- **Zero downtime** • Security patches applied while server runs
- **Automatic updates** • New vulnerabilities patched immediately
- **No disruption** • Your sites never go offline for updates
- **Always protected** • Kernel is continuously up-to-date

**The problem it solves:**  
Traditional servers require reboots for kernel security updates, causing downtime. Budget hosts delay updates to avoid disruption, leaving servers vulnerable. KernelCare eliminates this tradeoff.

**Real-world impact:**  
Critical security patches (like Heartbleed, Meltdown, Spectre) get applied immediately without any downtime or service disruption.

**Retail cost if purchased separately:** $4/month  
**Included in all plans:** ✓

---

### cPanel Control Panel

**What it is:**  
The industry-standard hosting control panel used by millions of websites worldwide.

**Why it matters:**  
- **Familiar interface** • If you've used hosting before, you know cPanel
- **Comprehensive management** • Files, databases, email, domains—everything in one place
- **One-click installers** • WordPress, Joomla, Drupal, 400+ apps
- **File Manager** • Edit files directly in browser
- **Email management** • Create accounts, forwarders, autoresponders
- **Database tools** • phpMyAdmin included
- **DNS management** • Full control over your domain settings
- **Metrics and logs** • Traffic stats, error logs, resource usage

**The problem it solves:**  
Custom control panels are confusing and limited. cPanel is standardized, powerful, and well-documented. If you ever move to another host, you already know their interface.

**Real-world impact:**  
Manage your entire hosting account without needing to contact support. Install WordPress in 60 seconds. Create email accounts on the fly. Check why your site is slow. All from a familiar interface.

**Retail cost if purchased separately:** $45/month  
**Included in all plans:** ✓

---

## Performance Technologies

### NVMe SSD Storage

**What it is:**  
Next-generation solid-state storage that connects directly to the motherboard via PCIe interface.

**Speed comparison:**
- **Traditional hard drives:** 100-150 MB/s
- **SATA SSD:** 500-600 MB/s
- **NVMe SSD:** 3,000-7,000 MB/s

**Real-world impact:**  
Your database queries are 5-10x faster. Your site loads faster. Backups complete faster. Everything that touches storage is noticeably quicker.

---

### HTTP/3 and QUIC Protocol

**What it is:**  
The latest version of HTTP, built on Google's QUIC protocol instead of TCP.

**Why it matters:**  
- **Faster initial connections** • Reduced handshake time
- **Better performance on poor networks** • Handles packet loss better
- **Multiplexed streams** • No head-of-line blocking
- **Built-in encryption** • Security by default

**Real-world impact:**  
Visitors on mobile networks or poor connections get dramatically better loading times. International visitors see improved performance.

---

### OpCache and Advanced Caching

**What it is:**  
PHP bytecode caching that stores compiled scripts in memory instead of recompiling on every request.

**Why it matters:**  
PHP applications (WordPress, Joomla, custom code) run 2-3x faster because the code is already compiled and ready to execute.

**Combined with LiteSpeed Cache:**  
Full-page caching means returning visitors get instant page loads—often under 100ms response time.

---

## Security Technologies

### ModSecurity Web Application Firewall

**What it is:**  
An open-source firewall that filters malicious HTTP traffic before it reaches your application.

**Protects against:**
- SQL injection attacks
- Cross-site scripting (XSS)
- Remote file inclusion
- Local file inclusion
- Command injection
- Session hijacking
- And 100+ other attack patterns

---

### DDoS Protection

**What it is:**  
Network-level filtering that detects and blocks distributed denial-of-service attacks.

**How it works:**  
Traffic is analyzed in real-time. Attack patterns are identified and blocked at the network edge, before they can overwhelm your site.

**Protection level:**  
Can handle attacks up to several Gbps. Larger attacks are mitigated upstream by data center infrastructure.

---

### CageFS Isolation

**What it is:**  
A virtualized file system that gives each hosting account its own isolated environment.

**Security benefits:**
- **File system isolation** • Users can't see other accounts' files
- **Process isolation** • Exploits can't jump between accounts
- **Symlink attack prevention** • Common shared hosting vulnerability eliminated
- **Configuration isolation** • Each account gets its own PHP, Python, etc.

---

## Email Technologies

### SpamAssassin + SpamExperts

**What it is:**  
Multi-layer spam filtering using both local (SpamAssassin) and cloud-based (SpamExperts) detection.

**Effectiveness:**
- **99%+ spam detection** rate
- **Near-zero false positives** • Legitimate email gets through
- **Learning filters** • Improve over time based on your patterns
- **Virus scanning** • ClamAV integration blocks malware

---

### DKIM, SPF, and DMARC

**What it is:**  
Email authentication protocols that prevent spoofing and improve deliverability.

**Why it matters:**  
Email from your domain is verified as legitimate, improving inbox delivery rates and preventing phishing attacks using your domain name.

**Setup:**  
Automatic for domains hosted with us. You just need to send email—we handle the authentication.

---

## Comparison: Us vs. Budget Hosting

| Feature | Budget Hosting | Our Hosting |
|---------|---------------|-------------|
| **Sites per server** | 1,000+ | 300-350 max |
| **Web server** | Apache 2.4 | LiteSpeed + HTTP/3 |
| **Resource isolation** | None | CloudLinux |
| **Security** | Basic | Imunify360 AI |
| **Backups** | Weekly (maybe) | Daily to hourly |
| **Storage** | HDD or SATA SSD | NVMe SSD |
| **Live patching** | Requires reboots | KernelCare |
| **Caching** | Basic | LSCache advanced |
| **Support response** | 24-48 hours | 4-24 hours |
| **Total software value** | ~$50/month | $150+/month |

---

## The Bottom Line

Every piece of software we include serves a specific purpose:

- **LiteSpeed** → Your site loads faster
- **CloudLinux** → Your performance is guaranteed
- **Imunify360** → Your site stays secure
- **JetBackup** → Your data is always recoverable
- **KernelCare** → Your server stays secure without downtime
- **cPanel** → You can manage everything yourself

Budget hosts cut corners on all of these to offer "$3/month hosting." We include them all because we believe hosting should actually work.

The result: Better performance, better security, better uptime—for the same price you'd pay for mediocre hosting elsewhere.
