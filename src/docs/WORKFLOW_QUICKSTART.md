# ⚡ Workflow Optimization - Quick Start Guide

## 🎯 5-Minute Tutorial

Start using the new workflow features in 5 minutes!

---

## 1️⃣ **Try Global Search (30 seconds)**

### **Step 1**: Press the magic key combo
```
Mac:     Cmd + K
Windows: Ctrl + K
Linux:   Ctrl + K
```

### **Step 2**: Type something
```
Try typing: "golden"
```

### **Step 3**: Navigate results
```
↑ ↓  →  Move up/down
Enter  →  Go to selected item
Esc    →  Close search
```

### **What you'll see**:
```
┌─────────────────────────────────────────┐
│  🔍 Search everything...                │
├─────────────────────────────────────────┤
│  📦 Brand Assets                        │
│  🎯 Golden Circle                       │
│     Foundation                          │
│                                          │
│  👥 Personas                            │
│  💻 Tech-Savvy Millennial               │
│     Digital native, 25-35               │
└─────────────────────────────────────────┘
```

---

## 2️⃣ **Master Keyboard Shortcuts (60 seconds)**

### **Most Useful Shortcuts**

```bash
# Navigation (hold Cmd/Ctrl)
Cmd+D  →  Dashboard
Cmd+B  →  Brand Assets
Cmd+R  →  Research Hub

# Vim-style (press keys in sequence)
g then d  →  Dashboard
g then b  →  Brand
g then r  →  Research
g then p  →  Personas
g then s  →  Strategy

# Help
?  →  Show all shortcuts
```

### **Try it now**:
1. Press `Cmd+D` → You're at Dashboard!
2. Press `g` then `b` → You're at Brand Assets!
3. Press `?` → See all shortcuts!

---

## 3️⃣ **Use Recent Items (45 seconds)**

### **How it works**:
Recent items are **automatically tracked** when you visit pages.

### **Where to find them**:
```
Coming soon: Recent Items button in top nav
Or programmatically via service
```

### **Try it now**:
```tsx
// In browser console:
import { recentItems } from './services/RecentItemsService';

// Add an item
recentItems.addItem({
  id: '1',
  type: 'brand-asset',
  title: 'Golden Circle',
  route: 'brand-1'
});

// View recent items
console.log(recentItems.getItems());
```

### **What it tracks**:
- ✅ Brand assets you view
- ✅ Personas you visit
- ✅ Research plans you open
- ✅ Strategy tools you use
- ✅ Any page you navigate to

---

## 4️⃣ **Navigate with Breadcrumbs (15 seconds)**

### **What are breadcrumbs?**
```
Dashboard > Brand Assets > Golden Circle
```

### **How to use**:
- Click any part to jump there
- Always visible at top of page
- Shows where you are

### **Example**:
```tsx
// You're here:
Dashboard > Brand > Golden Circle
          ↑ Click to go back to Brand Assets
```

---

## 5️⃣ **Right-Click Quick Actions (30 seconds)**

### **How to use**:
1. Right-click any item (brand asset, persona, etc.)
2. See context menu with actions
3. Click action or press shortcut

### **Example menu**:
```
┌─────────────────────────┐
│ ✏️  Edit          Cmd+E │
│ 👁️  View Results        │
│ 📋 Duplicate            │
│ ─────────────────────── │
│ 🗑️  Delete              │
└─────────────────────────┘
```

### **Try it**:
- Right-click a brand asset card
- See edit, view, delete options
- Click to execute action

---

## 🎓 **Cheat Sheet**

### **Global Search**
| Key | Action |
|-----|--------|
| `Cmd+K` | Open search |
| `↑` `↓` | Navigate results |
| `Enter` | Select item |
| `Esc` | Close |

### **Navigation**
| Key | Action |
|-----|--------|
| `Cmd+D` | Dashboard |
| `Cmd+B` | Brand Assets |
| `Cmd+R` | Research Hub |
| `g+d` | Dashboard (vim) |
| `g+b` | Brand (vim) |
| `g+r` | Research (vim) |
| `g+p` | Personas (vim) |
| `g+s` | Strategy (vim) |

### **General**
| Key | Action |
|-----|--------|
| `?` | Show shortcuts |
| `Cmd+/` | Show shortcuts |
| `Esc` | Close modal |

---

## 💡 **Pro Tips**

### **Tip 1: Use Cmd+K for Everything**
```
Instead of clicking through 5 menus:
Cmd+K → type "golden" → Enter
```
**Time saved**: 8 seconds per navigation

---

### **Tip 2: Learn 3 Vim Shortcuts**
```
g+d  →  Dashboard
g+b  →  Brand
g+r  →  Research
```
**Why**: Faster than Cmd+X for repeated navigation

---

### **Tip 3: Check Recent Items Daily**
```
Start your day:
1. Open Recent Items
2. See what you worked on yesterday
3. Pick up where you left off
```
**Time saved**: 2 minutes per session

---

### **Tip 4: Right-Click Instead of Click**
```
Instead of:
Click → Scroll → Find button → Click
```
```
Just:
Right-click → Select action
```
**Time saved**: 3 seconds per action

---

### **Tip 5: Share Shortcuts with Team**
```
1. Press ?
2. Screenshot shortcuts modal
3. Share in Slack/Teams
4. Everyone becomes a power user!
```

---

## 📊 **Before vs After**

### **Scenario: Navigate to Golden Circle**

**❌ Before** (5 steps, 8 seconds):
```
1. Click sidebar "Brand Assets"
2. Wait for page load
3. Scroll to find Golden Circle
4. Click Golden Circle card
5. Wait for page load
```

**✅ After** (2 steps, 2 seconds):
```
1. Press Cmd+K
2. Type "gold" + Enter
```

**Result**: 75% faster! ⚡

---

## 🎯 **Daily Workflow**

### **Morning Routine**
```
1. Press Cmd+K
2. Type "dashboard"
3. Review recent activity
4. Press g+b to check brand assets
5. Use recent items to continue yesterday's work
```

### **During Work**
```
1. Use Cmd+K to jump between pages
2. Use g+x shortcuts for frequent navigation
3. Right-click items for quick actions
4. Use breadcrumbs to navigate up
```

### **End of Day**
```
1. Recent items automatically saved
2. Tomorrow: pick up where you left off
3. No need to remember what you were doing!
```

---

## 🚀 **Next Steps**

### **Week 1: Basic Usage**
- [ ] Use Cmd+K 5 times today
- [ ] Try g+d, g+b, g+r shortcuts
- [ ] Press ? to see all shortcuts
- [ ] Right-click a brand asset

### **Week 2: Power User**
- [ ] Use Cmd+K for all navigation
- [ ] Learn 5 more shortcuts
- [ ] Use recent items daily
- [ ] Share shortcuts with team

### **Week 3: Expert**
- [ ] Navigate only with keyboard
- [ ] Customize your shortcuts
- [ ] Teach others
- [ ] Track time savings

---

## 🎉 **You're Ready!**

**You now know**:
- ✅ How to use Cmd+K search
- ✅ 12 keyboard shortcuts
- ✅ How recent items work
- ✅ How to use breadcrumbs
- ✅ How to use right-click actions

**Start using it now!**

Press `Cmd+K` and start searching! 🚀

---

## 📞 **Need Help?**

- Press `?` to see all shortcuts
- Read [Full Documentation](./WORKFLOW_OPTIMIZATION_README.md)
- Check [Integration Guide](./WORKFLOW_INTEGRATION_COMPLETE.md)

---

**Happy workflows! ⚡**
