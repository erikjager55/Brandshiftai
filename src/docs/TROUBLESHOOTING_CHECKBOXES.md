# 🔍 TROUBLESHOOTING: Checkboxes Not Visible

**Issue**: Checkboxes are not showing in Advanced view  
**Expected**: Checkboxes should appear on all items  
**Date**: 22 December 2024

---

## ✅ **WHAT'S BEEN FIXED**

### **1. Tab Navigation**:
```
✅ Clear tab bar added
✅ Library | Advanced | Matrix tabs
✅ "Bulk Ops" badge on Advanced tab
✅ Active tab highlighted
✅ Consistent across all 3 views
```

### **2. Component Structure**:
```
✅ BrandAssetsAdvancedViewWithBulk created
✅ Includes bulk operations logic
✅ Has checkbox rendering
✅ Used in Advanced view
```

---

## 🐛 **POSSIBLE ISSUES**

### **Check 1: Are you in Advanced View?**
```
The page opens in Advanced mode by default (viewMode = 'advanced')

Look for the tabs at the top:
┌──────────────────────────────────────────┐
│ [Library] [Advanced*] [Matrix]           │ ← These tabs
└──────────────────────────────────────────┘

"Advanced" should have:
• Highlighted background
• "Bulk Ops" badge
```

### **Check 2: Console Errors?**
```
Open browser console (F12)
Check for errors related to:
• BulkActionBar
• BulkSelectionControls
• useBulkSelection
• Missing imports
```

### **Check 3: Component Hierarchy**
```
Current flow:
BrandAssetsViewSimple
  ↓ (if viewMode === 'advanced')
BrandAssetsAdvancedViewWithBulk
  ↓
AdvancedDataView
  ↓
renderCard() / renderListItem() / renderTableRow()
    ↓
Checkboxes should be here!
```

---

## 🎯 **EXPECTED BEHAVIOR**

### **In Advanced View, you should see**:

```
TOP:
┌──────────────────────────────────────────┐
│ [Select All] [Clear] [Select By...]     │ ← Selection Controls
└──────────────────────────────────────────┘

ITEMS (Grid View):
┌──────────────────────┐
│ ☐      [⭐Essential]  │ ← Checkbox here!
│   [Icon]             │
│   Golden Circle      │
└──────────────────────┘

BOTTOM (when items selected):
┌──────────────────────────────────────────┐
│ ☑ 3 items selected                       │ ← Action bar
│ [Status] [Priority] [Tags] [Delete] ...  │
└──────────────────────────────────────────┘
```

---

## 🔍 **DEBUG STEPS**

### **Step 1: Verify Tab**
```
1. Refresh page
2. Look for tabs at top
3. Click "Advanced" tab (with "Bulk Ops" badge)
4. Subtitle should say "Advanced filtering and bulk operations"
```

### **Step 2: Check View Mode Buttons**
```
In Advanced view, above the items you should see:
• [🎯 Grid] [📋 List] [📊 Table] [📋 Kanban]
• View mode switcher
• Sorting controls
• Filtering controls
```

### **Step 3: Look for Selection Controls**
```
Above the items grid, you should see:
• "Select All" button
• "Clear" button (if items selected)
• "Select By..." dropdown
```

### **Step 4: Inspect an Item**
```
1. Open browser DevTools (F12)
2. Inspect a brand asset card
3. Look for checkbox element in DOM
4. Check if it's hidden by CSS
```

---

## 🎨 **VISUAL GUIDE**

### **Library View** (No checkboxes - normal):
```
┌────────────────────────────────────────┐
│ Tab: [Library*] [Advanced] [Matrix]   │
├────────────────────────────────────────┤
│                                        │
│ ┌────────┐ ┌────────┐ ┌────────┐     │
│ │ Asset  │ │ Asset  │ │ Asset  │     │ ← No checkboxes
│ └────────┘ └────────┘ └────────┘     │
└────────────────────────────────────────┘
```

### **Advanced View** (Checkboxes visible):
```
┌────────────────────────────────────────┐
│ Tab: [Library] [Advanced*] [Matrix]   │
├────────────────────────────────────────┤
│ [Select All] [Clear] [Select By...]   │ ← Controls
├────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐     │
│ │☐ Asset │ │☐ Asset │ │☐ Asset │     │ ← Checkboxes!
│ └────────┘ └────────┘ └────────┘     │
└────────────────────────────────────────┘
```

---

## 🔧 **MANUAL CHECK**

### **Can you see these tabs?**
```
☐ Library tab (grid icon)
☐ Advanced tab (zap icon + "Bulk Ops" badge)
☐ Matrix tab (table icon)
```

### **In Advanced view, can you see?**
```
☐ "Select All" button above items
☐ View mode buttons (Grid/List/Table/Kanban)
☐ Sorting and filtering controls
```

### **If YES to above but NO checkboxes**:
```
→ The component is rendering
→ But checkboxes might be hidden by CSS
→ Or AdvancedDataView not rendering them
```

### **If NO to above**:
```
→ You might not be in Advanced view
→ Click the "Advanced" tab with "Bulk Ops" badge
```

---

## 💡 **NEXT STEPS**

### **Option 1: Share Console Errors**
```
1. Open browser console (F12)
2. Look for red errors
3. Share the error messages
```

### **Option 2: Share Screenshot**
```
1. Go to Brand section
2. Click "Advanced" tab
3. Take screenshot
4. Share what you see
```

### **Option 3: Try Different View Mode**
```
In Advanced view:
1. Try clicking different view modes:
   • Grid view (default)
   • List view
   • Table view
   
Do checkboxes appear in any of these?
```

---

## 📝 **IMPORTANT NOTES**

**Default State**:
- Page opens in **Advanced** view by default
- Checkboxes should be visible immediately
- No selection is needed first

**Tab Location**:
- Tabs are **below** the page title
- Not in the sidebar
- In a light gray rounded box

**Checkbox Location**:
- **Grid view**: Top-left corner of each card
- **List view**: Left side of each row
- **Table view**: First column

---

**Let me know what you see!** 👀

Describe:
1. Which tab is active (Library/Advanced/Matrix)?
2. What subtitle do you see under "Your Brand"?
3. Do you see "Select All" button above items?
4. Any console errors?
