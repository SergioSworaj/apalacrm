# APALA JEWELS — PREMIUM CLIENT RELATIONSHIP CRM

## FRONTEND UI/UX DEMO ONLY

Build a **high-fidelity frontend-only CRM demo for Apala Jewels**, a premium jewelry company.

This is a **UI/UX prototype/demo**, NOT a backend implementation.

Do not spend time building:

* Real database
* Backend APIs
* Authentication backend
* Real WhatsApp integration
* Real email integration
* Real Google Calendar integration
* Real notifications
* Real data migration
* Production database logic

Instead, use **realistic mock data and frontend state** so the entire application feels functional and can be demonstrated to Apala Jewels management.

The prototype should be highly interactive:

* Buttons should work
* Modals should open
* Tabs should switch
* Dropdowns should work
* Search should work against mock data
* Filters should work
* Timeline should update visually
* Forms should open and submit into local/mock state
* Status changes should visually update
* Assignment changes should visually update
* Dashboard numbers should respond to filters where practical

The objective is to demonstrate what the final Apala CRM could look and feel like.

---

# 1. DESIGN DIRECTION

This is a **luxury jewelry CRM**, not a generic Salesforce-style CRM.

The UI should feel:

* Premium
* Elegant
* Minimal
* Editorial
* Sophisticated
* Calm
* High-end
* Extremely organized

Use a restrained luxury palette:

* Ivory / warm white
* Charcoal / near-black
* Soft champagne / muted gold accents
* Very subtle neutral grays

Avoid:

* Bright SaaS colors
* Excessive gradients
* Cartoon-like illustrations
* Excessive rounded cards
* Huge colorful dashboards
* Generic Bootstrap appearance
* Overly dense enterprise UI

Use elegant typography with strong hierarchy.

The interface should feel appropriate for a company selling high-value jewelry.

---

# 2. APPLICATION SHELL

Create a persistent application layout.

### Left Sidebar

Logo:

**APALA**

Subtitle:

**CLIENT RELATIONSHIP**

Navigation:

1. Overview
2. Clients
3. Active Leads
4. Visits
5. Appointments
6. Opportunities
7. Customizations
8. Service Cases
9. Follow-ups
10. Communications
11. Analytics
12. Branches
13. Team
14. Settings

Bottom of sidebar:

* Current user
* Role
* Branch
* Profile
* Logout

Add a branch selector where appropriate.

---

# 3. DASHBOARD / OVERVIEW

The main dashboard should immediately communicate the health of the client relationship operation.

Header:

**Good morning, Anisha**

Subtext:

**Here's what needs your attention today.**

Date selector:

Today / This Week / This Month / Custom

---

## KPI cards

Show:

### Clients

2,486

### Active Opportunities

186

### Follow-ups Due

24

### Appointments Today

8

### Customizations

17

### Service Cases

6

### At-Risk Clients

31

### Dormant Clients

284

---

# 4. TODAY'S PRIORITIES

Large section showing actionable items.

Cards:

### Follow-ups Due

Client
Reason
Owner
Due time
Engagement

Actions:

* Contact
* Reschedule
* Complete

### Upcoming Appointments

Time
Client
Branch
Advisor
Purpose

### Customizations Requiring Attention

Client
Customization
Stage
Day 18 / 45
Designer
Expected completion

### Service Cases

Client
Repair / Return / Exchange
Status
Promised resolution

---

# 5. CLIENT DIRECTORY

Create a premium searchable client directory.

Top:

**Clients**

Search:

> Search by Client ID, name, phone, email...

Filters:

* Branch
* Owner
* Client Type
* Tier
* Status
* Engagement
* Source
* Product Interest
* Last Visit
* Last Purchase

Table columns:

* Client ID
* Client
* Tier
* Client Type
* Owner
* Branch
* Engagement
* Last Visit
* Last Purchase
* Open Opportunity
* Next Follow-up

---

# 6. CLIENT ID SYSTEM

Every client should visibly have a unique Client ID.

Use realistic mock IDs such as:

**26-BLW-001-NS**

**26-LBM-024-NKS**

**26-MKT-104-RS**

This is a FRONTEND DEMO, so the exact final ID generation logic does not need to be implemented.

Show the ID prominently.

The system should visually communicate that the Client ID connects the entire customer history.

---

# 7. GLOBAL SEARCH

Make the global search extremely important.

Search examples:

> 26-BLW-001-NS

or:

> Niraj Shrestha

or:

> 9841XXXXXX

Search result should show:

**Niraj Shrestha**

Client ID
Tier
Owner
Branch
Engagement

Click → opens the complete Client 360 profile.

---

# 8. ADD CLIENT

Create an elegant Add Client modal/page.

Required fields:

* Full Name
* Mobile
* Email
* Store / Source
* Assigned Owner
* Contact Permission

Optional:

* Secondary Phone
* Occupation
* Address
* Gender
* Date of Birth
* Client Type
* Client Source
* Product Preferences
* Tags
* Notes

Show duplicate detection visually.

Example:

> Possible existing client found

Niraj Shrestha
98XXXXXXXX
26-BLW-001-NS

Actions:

**Open existing client**

**Continue as family member**

**Create new client**

---

# 9. FAMILY TREE

This is an important feature.

Do NOT merge family members into one client record.

Instead create a **Family Relationship** section.

Example:

Niraj Shrestha

Family:

* Priya Shrestha — Spouse
* Aarav Shrestha — Son
* Meena Shrestha — Mother

Each member can have their own Client ID.

Show:

**Family Relationship**

rather than treating them as one customer.

Allow:

* Add family member
* Define relationship
* Open family member profile

Visually display this as a simple relationship tree.

---

# 10. CLIENT 360 PROFILE

This should be the **most polished screen in the entire demo**.

Header:

### Niraj Shrestha

`26-BLW-001-NS`

Tier badge:

**Gold**

Client Type:

**Apala Client**

Status:

**Active**

Engagement:

**Hot**

Owner:

**Anisha Rai**

Branch:

**Baluwatar**

---

## Quick metrics

* Lifetime Value
* Purchases
* Visits
* Open Opportunities
* Customizations
* Last Contact
* Next Follow-up

---

## Profile navigation

Tabs:

**Overview**

**Timeline**

**Visits**

**Communications**

**Opportunities**

**Purchases**

**Customizations**

**Follow-ups**

**Appointments**

**Occasions**

**Service Cases**

**Preferences**

**Family**

**Notes**

---

# 11. CLIENT OVERVIEW

Show:

### Personal Information

* Name
* Phone
* Email
* Occupation
* Address
* DOB

### Relationship

* Client ID
* Client Type
* Tier
* Status
* Engagement
* Source
* Branch
* Owner

### Preferences

Product Category:

* Rings
* Necklace
* Earrings

Metal:

* Gold
* White Gold

Gemstone:

* Diamond

Style:

* Minimal
* Contemporary

Price Range:

* NPR 200K–500K

Communication:

* WhatsApp
* Phone

Language:

English / Nepali

### Behaviour Tags

Show tags such as:

* Repeat Buyer
* Custom-Design Client
* Bridal Buyer
* High-Value Buyer
* Design-Driven

---

# 12. CLIENT TIMELINE

Create a beautiful vertical timeline.

Every meaningful interaction appears here.

Examples:

### TODAY — 11:32 AM

**WhatsApp Conversation**

Anisha Rai

Discussed revised engagement ring design.

Client requested a smaller center stone.

---

### 19 SEP — 4:20 PM

**Store Visit**

Baluwatar

Assisted by Anisha Rai

Purpose:
Design consultation

Outcome:
Customization opportunity created

---

### 12 SEP — 2:10 PM

**Follow-up Completed**

Client interested in diamond bracelet.

Outcome:
Rescheduled

Reason:
Client travelling.

---

### 02 SEP

**Purchase**

Custom diamond ring

Sales Value:
NPR 425,000

---

Each event should show:

* Date
* Time
* Activity
* Staff
* Branch
* Summary

Allow filtering timeline by:

**All | Visits | Calls | WhatsApp | Sales | Follow-ups | Customization | Service**

---

# 13. OWNERSHIP

Show:

### Client Owner

Anisha Rai

### Supporting Representative

Rohan Shrestha

Make both editable.

Changing ownership should visually create a timeline event.

Example:

> Client Owner changed
> Anisha Rai → Rohan Shrestha
> Changed by: Manager
> 20 Sep 2026

For the demo, show a transfer modal with:

* Current owner
* New owner
* Supporting representative
* Reason
* Confirm transfer

---

# 14. ROLE-BASED UI

Create four demo roles:

## CRM ADMIN

Full interface.

Can see:

Everything

Can edit:

Everything

Can manage:

* Users
* Clients
* Branches
* Tiers
* Settings
* Permissions
* Data
* Archives

---

## MANAGER

Manager sees:

* Own dashboard
* All subordinate executives
* Branch/company performance
* Client directory
* Opportunities
* Follow-ups
* Service cases
* Analytics

But make management controls visually distinct.

---

## EXECUTIVE / SALES ADVISOR

The executive is the primary person interacting with clients.

Dashboard focuses on:

* My Clients
* My Leads
* My Follow-ups
* My Visits
* My Appointments
* My Opportunities
* My Customizations

They can also see a **Limited Client Directory** containing:

* Client name
* Client ID
* Owner

Additional client information becomes visible when the client is assigned to them.

---

## ASSISTANT

Can:

* View relevant client information
* Enter data
* Assist executives
* Record visits
* Add communication
* Add notes
* Assist with appointments

Keep permissions visually obvious.

---

# 15. CLIENT TYPE

Do not confuse client type with engagement status.

Use:

**New**

**2nd Visit**

**3rd Visit**

**Apala Client**

For the demo, show that once a client reaches the fourth visit, their client type becomes:

**Apala Client**

But their visit counter continues.

Example:

**Visit #7**

Client Type:

**Apala Client**

---

# 16. CLIENT TIER

Show:

**Bronze | Silver | Gold | Platinum**

This is separate from Client Type.

Show the tier prominently but subtly.

Example:

Gold

---

## Tier detail drawer

When clicked, show:

* Tier
* Since
* Lifetime Value
* Purchase count
* Relationship duration
* Customization history
* Applicable privileges
* Management notes

Show privileges as guidance only.

Example:

**Gold Privileges**

* Priority consultation
* Selected service privileges
* Eligible benefits

Add:

> Additional privilege approval: CRM Admin

---

# 17. CLIENT STATUS

Show:

**Active**

**Stable**

**At Risk**

**Dormant**

Make status visually distinct from Tier and Engagement.

Example:

Gold + Active + Hot

These are three different dimensions.

---

# 18. ENGAGEMENT

Keep existing terminology:

* Hot
* Warm
* Administrative
* Drop-off
* Cold

For the demo, allow the executive to manually change it.

Also create a small UI concept for:

**System Activity Signals**

showing factors such as:

* Recent visit
* Recent purchase
* Open opportunity
* Overdue follow-up
* Recent communication

But don't automatically override the manual engagement in the demo.

---

# 19. VISIT MODULE

Create a dedicated **Visits** module.

Top metrics:

* Today's Visits
* This Week
* Purchases
* Non-Purchases
* Consultations
* Service Visits

Table:

Date
Time
Client
Branch
Advisor
Purpose
Outcome
Purchase
Value

---

# 20. ADD VISIT

Create one optimized visit form.

First:

### Client

Search Client ID / Name

### Branch

Dropdown:

* Baluwatar
* Labim

### Visit Date & Time

### Advisor / Host

### Purpose

Options:

* Sales
* Consultation
* Product enquiry
* Stock / Price
* Appointment
* Design concept
* Sketch discussion
* CAD discussion
* Costing discussion
* Collection
* Repair
* Return
* Exchange
* Administrative
* Other

---

## Visit outcome

* Purchased
* Did not purchase
* Follow-up required
* Customization
* Repair
* Return
* Exchange
* Consultation only

If **Purchased**:

Show:

* Product Code
* Inventory Type
* Sales Value
* Discount
* Remarks

Inventory Type:

**Stock Product**

or

**Custom Order**

If **Did Not Purchase**:

Require:

**Reason**

---

# 21. VISIT REMARKS

Large rich text area:

> What happened during this visit?

Example:

> Client visited with spouse. Interested in a diamond engagement ring around NPR 350K–450K. Reviewed three designs. Requested CAD customization.

This becomes a timeline entry.

---

# 22. PRODUCT INTEREST

Within every visit, allow:

**Product Interest**

* Ring
* Necklace
* Earrings
* Bracelet
* Bangle
* Diamond
* Gold
* Custom

Add:

Interest level:

Low / Medium / High

Budget:

NPR 200K–400K

Remarks.

---

# 23. FUTURE ARRIVAL / FUTURE OPPORTUNITY

Add:

### Future Opportunity

Expected date:

October 2026

Event:

Wedding

Potential purchase:

Wedding jewelry

Remarks:

> Client expects to return with family before wedding.

---

# 24. COMMUNICATIONS

Dedicated Communications module.

Filters:

* WhatsApp
* Phone
* Email
* In-person
* Video Call
* SMS

Show table:

Date
Client
Channel
Advisor
Interaction Category
Summary
Next Step

Interaction categories:

* Product Enquiry
* Stock / Price
* Appointment Setup
* Design Concept
* Sketch Discussion
* CAD Discussion
* Costing Discussion
* Order Confirmation
* Account Discussion
* Other

---

# 25. ADD COMMUNICATION

Modal:

Client

Date / Time

Channel

Incoming / Outgoing

Interaction Category

Conversation Summary

Client Response

Next Step

Follow-up Date

Engagement

Save.

---

# 26. OPPORTUNITIES

Dedicated pipeline.

Use a premium Kanban board.

Stages:

1. New Interest
2. Requirement Understood
3. Options Presented
4. Appointment Planned
5. Considering
6. Costing / Design
7. Order Confirmed
8. Closed Successfully
9. Closed Without Sale
10. Future Opportunity

Cards show:

Client
Owner
Product
Estimated Value
Last Activity
Next Follow-up

---

# 27. CLOSED WITHOUT SALE

When an opportunity is closed without sale, show:

**Lost Reason**

Required.

Examples:

* Price
* Not interested
* Timing
* Product unavailable
* Competitor
* Waiting for occasion
* Design not suitable
* Other

---

# 28. ORDER CONFIRMED

Visually communicate that:

**Order Confirmed = Advance Received + Order Sheet Created**

Do not treat a verbal confirmation as an order.

---

# 29. CUSTOMIZATION MODULE

This deserves a dedicated premium workflow.

Create:

### Customization Dashboard

KPIs:

* Active Customizations
* Due Soon
* Delayed
* Awaiting Client
* In Production
* Ready

---

## Customization card

Client

Customization ID

Product Type

Designer

Sales Advisor

Stage

Day 18 / 45

Estimated Cost

Expected Completion

---

# 30. CUSTOMIZATION DETAIL

Create a beautiful horizontal/vertical journey:

**Request**

↓

**Product Type**

↓

**Designer Assigned**

↓

**Design**

↓

**Design Review**

↓

**CAD**

↓

**Costing**

↓

**Client Approval**

↓

**Production**

↓

**Quality Check**

↓

**Ready**

↓

**Delivered**

Show:

**DAY 18 / 45**

Large progress indicator.

---

# 31. CUSTOMIZATION INFORMATION

Display:

* Product Type
* Designer
* Client
* Advisor
* Branch
* Estimated Cost
* Final Cost
* Client Budget
* Design Brief
* Conversation Summary
* Next Step
* Expected Date
* Days Remaining

Add visual design file placeholders.

Show versions:

**Design V1**

**Design V2**

**Approved**

---

# 32. FOLLOW-UPS

Dedicated Follow-up module.

Tabs:

**Today | Upcoming | Overdue | Completed**

Table:

Due Date
Client
Owner
Reason
Opportunity
Priority
Status

Priority:

Normal / High / At Risk

---

# 33. FOLLOW-UP DETAIL

Show:

Client

Reason

Last Contact

Next Contact

Days Since Contact

Owner

Notes

Actions:

**Complete**

**Reschedule**

**Escalate**

**Create Opportunity**

**Create Appointment**

If rescheduled:

Require reason.

Show:

**Rescheduled 1 / 2**

After second reschedule, visually flag:

> Management Attention Required

---

# 34. APPOINTMENTS

Create calendar-style appointment screen.

Views:

* Day
* Week
* Month

Appointment card:

Time

Client

Advisor

Branch

Purpose

Status

Appointments from both branches should appear in the same calendar.

Show branch visually.

Statuses:

* Scheduled
* Visited
* Postponed
* Cancelled

If cancelled/postponed:

Require reason.

---

# 35. SERVICE CASES

Create dedicated module for:

* Repair
* Return
* Exchange
* Complaint / Grievance

Dashboard:

Open Cases
Urgent
Due Today
Overdue
Resolved

---

# 36. SERVICE CASE DETAIL

Show:

Client

Case ID

Type

Product

Branch

Owner

Severity

Status

Promised Resolution Date

Accountable Person

Attachments

Resolution

Client Satisfaction

Timeline

---

# 37. GRIEVANCE

If a grievance is unresolved, show a prominent:

**AT RISK**

indicator on the client profile.

The grievance should have:

* Severity
* Owner
* Resolution date
* Escalation
* Attachments
* Resolution
* Client satisfaction

---

# 38. OCCASIONS

Client profile:

### Important Occasions

Birthday
24 October

Wedding Anniversary
12 December

Wedding
18 December

Custom Occasion

Each occasion:

* Date
* Type
* Reminder
* Notes

Allow Add / Edit / Delete.

---

# 39. REMINDERS

Create a notification center.

Example:

### 9:30 AM DAILY SUMMARY

**5 Follow-ups due**

**2 Overdue**

**1 Gold client at risk**

**3 Upcoming appointments**

**2 Customizations due this week**

Portal reminders are mandatory in the UI concept.

Email reminders should also appear as an available channel.

Slack can appear under:

**Coming Later**

---

# 40. ANALYTICS

Create an executive/company analytics dashboard.

Sections:

### Client Growth

Graph

### Client Distribution

Bronze / Silver / Gold / Platinum

### Engagement

Hot / Warm / Administrative / Drop-off / Cold

### Status

Active / Stable / At Risk / Dormant

### Visit Analytics

Visits by:

* Branch
* Purpose
* Outcome
* Advisor

### Sales

* Sales value
* Purchases
* Non-purchases
* Conversion

### Opportunities

Pipeline value

### Customization

Stage distribution

### Service

Repairs / Returns / Exchanges / Grievances

---

# 41. BRANCH ANALYTICS

Branch selector:

**All Branches**

**Baluwatar**

**Labim**

Show:

* Clients
* Visits
* Sales
* Opportunities
* Conversion
* Follow-ups
* Customizations
* Service Cases
* Advisor performance

---

# 42. EXECUTIVE PERFORMANCE

Manager view should show subordinates.

Example:

### Sales Advisors

Anisha Rai

Clients: 184
Active Opportunities: 21
Follow-ups: 8
Visits: 31
Sales: NPR 4.8M

Rohan Shrestha

Clients: 163
Active Opportunities: 17
Follow-ups: 11
Visits: 26
Sales: NPR 3.9M

Make this clickable.

---

# 43. DATA QUALITY

Create an Admin-only:

### Data Quality Center

Show:

* Possible duplicates
* Missing phone
* Missing email
* Missing owner
* Missing branch
* Incomplete profiles
* Historical records needing review

Use status:

**Needs Review**

This represents the historical migration requirement.

---

# 44. HISTORICAL DATA

Create a UI concept for:

**Historical Data**

Show:

Total historical clients:

2,200+

Priority profiles:

470–500

Historical visitor records:

400+

Communication records:

3,000+

Grievances:

5

Show:

**Needs Review**

records.

Do NOT actually implement migration.

This is only a demo screen.

---

# 45. DUPLICATE MANAGEMENT

Admin-only screen.

Example:

### Possible Duplicate

Niraj Shrestha

26-BLW-001-NS

vs

Niraj Shrestha

OLD-00492

Show side-by-side:

Phone
Email
Visits
Purchases
Owner

Actions:

**Merge**

**Keep Separate**

**Mark Family**

---

# 46. ARCHIVE

Admin-only.

Deleted records should visually move into:

**Archived Records**

Show:

* Client
* Record Type
* Deleted By
* Date
* Restore

This is a UI demonstration only.

---

# 47. PERMISSIONS DEMO

Create a role switcher for demonstration.

Top-right:

**View as: CRM Admin**

Dropdown:

* CRM Admin
* Manager
* Executive
* Assistant

When switching role, demonstrate different sidebar/dashboard access.

This is extremely useful for the client demo.

---

# 48. CONTACT PERMISSIONS

On client profile show:

### Communication Preferences

Contact permitted ✓

WhatsApp permitted ✓

Email permitted ✓

Promotional communication:

**Allowed / Not Allowed**

Show this as a visible tag/status.

---

# 49. NOTES

Create:

### Client Notes

Notes should show:

Author

Date

Time

Note

Visibility

For the demo, sensitive-note controls can be represented visually, even if permission enforcement is not implemented.

---

# 50. AUDIT / HISTORY

Every edit should visually show history.

Example:

### Client Type Changed

Old:
3rd Visit

New:
Apala Client

Changed by:
CRM Admin

20 Sep 2026 — 4:31 PM

Never make the demo appear as though edits overwrite history.

---

# 51. MOCK DATA

Populate the application with enough realistic data to make the demo feel alive.

Use fictional names and realistic jewelry-related data.

Include:

* 30+ clients
* Multiple tiers
* Multiple branches
* 15+ opportunities
* 10+ appointments
* 10+ follow-ups
* 8+ customizations
* Several service cases
* Communication history
* Family relationships
* Different owners
* At-risk clients
* Dormant clients
* Various product interests

Do not use empty dashboards.

The first screen should immediately look like a live CRM.

---

# 52. DEMO SCENARIO

Make one client particularly complete so the entire CRM can be demonstrated.

Example:

### Niraj Shrestha

Client ID:
26-BLW-001-NS

Tier:
Gold

Client Type:
Apala Client

Status:
Active

Engagement:
Hot

Owner:
Anisha Rai

Family:
Priya Shrestha — Spouse

Interests:
Diamond Engagement Ring

Upcoming Occasion:
Wedding

Active Opportunity:
NPR 450,000

Customization:
Day 18 / 45

Last Visit:
19 Sep 2026

Next Follow-up:
22 Sep 2026

Previous Purchase:
NPR 425,000

Include enough timeline history that clicking through the profile tells a complete story.

---

# 53. MICRO-INTERACTIONS

The prototype should feel polished.

Include:

* Hover states
* Active states
* Dropdown animations
* Modal transitions
* Toast notifications
* Confirmation dialogs
* Empty states
* Loading states
* Skeleton states
* Success states
* Error states
* Tooltips
* Breadcrumbs
* Keyboard-friendly search

Keep animations subtle and premium.

---

# 54. RESPONSIVE DESIGN

Desktop is the primary target.

Also make the UI reasonably responsive for:

* Laptop
* Tablet

Do not prioritize mobile app design yet.

---

# 55. IMPORTANT FRONTEND ARCHITECTURE

Even though this is frontend-only, structure the code cleanly as if this will eventually connect to a backend.

Use reusable components:

* ClientCard
* ClientTable
* ClientProfile
* Timeline
* VisitForm
* CommunicationForm
* OpportunityCard
* OpportunityPipeline
* CustomizationJourney
* FollowUpCard
* AppointmentCard
* ServiceCase
* KPI Card
* FilterBar
* Search
* Modal
* Drawer
* DataTable
* StatusBadge
* TierBadge
* ActivityBadge

Use mock data objects rather than hardcoding every screen independently.

---

# 56. DO NOT BUILD A GENERIC ADMIN PANEL

This is critical.

The final design should communicate:

> "This is a luxury jewelry clienteling CRM."

Not:

> "This is another generic business dashboard."

The **client relationship should be the center of the entire product**.

The user should be able to move naturally:

**Client → Visit → Conversation → Opportunity → Follow-up → Customization → Purchase → Service → Future Occasion**

without feeling like they are jumping between unrelated software modules.

---

# 57. FINAL DEMO FLOW

The prototype should support this exact demonstration:

### Step 1

Open Dashboard.

### Step 2

Search:

**26-BLW-001-NS**

### Step 3

Open Niraj's Client 360.

### Step 4

Review:

* Tier
* Status
* Engagement
* Owner
* Family
* Preferences
* Purchase history
* Timeline

### Step 5

Open Visits.

Show previous store visits.

### Step 6

Open Timeline.

Show WhatsApp → Visit → Opportunity → Purchase → Follow-up.

### Step 7

Open active Opportunity.

Show:

**Diamond Engagement Ring**

### Step 8

Open Customization.

Show:

**Day 18 / 45**

and the complete design → CAD → costing journey.

### Step 9

Open Follow-up.

Show:

**Due 22 Sep**

### Step 10

Open Appointment Calendar.

Show upcoming wedding consultation.

### Step 11

Open Service Cases.

Show previous repair.

### Step 12

Switch:

**View as Executive**

Show restricted executive experience.

### Step 13

Switch:

**View as Manager**

Show subordinate performance.

### Step 14

Switch:

**View as CRM Admin**

Show full analytics and administration.

---

# FINAL REQUIREMENT

Build the frontend so that when Apala Jewels management sees the prototype, they can understand:

**WHO the client is**

↓

**WHAT has happened**

↓

**WHAT the client wants**

↓

**WHO is responsible**

↓ 

**WHAT opportunity exists**

↓

**WHAT needs to happen next**

↓

**WHEN it needs to happen**

↓

**WHAT happened historically**

↓

**WHAT the future relationship could look like**

The product should feel like a **premium clienteling command center for Apala Jewels**, with the Client 360 profile as the heart of the system.

Again: **FRONTEND DEMO ONLY. Use mock data. Prioritize UI/UX quality, realistic interactions, navigation, states, and visual polish over backend implementation.**
