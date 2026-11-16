import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  AreaChart,
  BarChart,
  Combobox,
  DashboardShell,
  DataTable,
  DatePicker,
  DesktopFrame,
  DonutChart,
  Field,
  Fidelity,
  FIDELITY_LEVELS,
  Gauge,
  Grid,
  Heading,
  Label,
  LineChart,
  Menu,
  MobileFrame,
  Modal,
  PieChart,
  Progress,
  Sparkline,
  StatTile,
  Text,
  Tip,
  XImage,
  type FidelityLevel,
} from '@/wireframe'

/* ----------------------------- Contact demo ----------------------------- */

function ContactScreen() {
  return (
    <div className="bg-background">
      <header className="flex items-center gap-6 border-b px-6 py-3">
        <XImage className="h-8 w-14" />
        <div className="flex items-center gap-2">
          <XImage className="h-8 w-8" />
          <Text lines={1} className="w-24">Social media links</Text>
        </div>
        <nav className="ml-4 flex items-center gap-6">
          {['Page', 'Page', 'Page', 'Page', 'Page'].map((p, i) => (
            <Label key={i}>{p}</Label>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <XImage className="h-7 w-7" />
          <Label>username</Label>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <Heading level={1}>Contact</Heading>
          <Text lines={1}>Screening &amp; distribution inquiries</Text>
          <Text lines={1}>info@mysite.com</Text>
          <Text lines={2} />
          <Text lines={2} />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name"><Input readOnly /></Field>
            <Field label="Last Name"><Input readOnly /></Field>
            <Field label="Email*"><Input readOnly /></Field>
            <Field label="Subject"><Input readOnly /></Field>
          </div>
          <Textarea readOnly className="h-40" />
          <div className="flex items-center gap-5">
            <Button>
              <Label className="text-primary-foreground">Submit</Label>
            </Button>
            <Text lines={1} className="w-40">Thanks for submitting!</Text>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <XImage />
              <Label>Product name</Label>
              <Text lines={1} className="w-16">Cost</Text>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted px-6 py-3 text-center">
        <Text lines={1} className="mx-auto w-64">© All rights reserved 2021 Movie Title</Text>
      </div>
    </div>
  )
}

/* ---------------------------- Dashboard demo ---------------------------- */

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <Heading level={3}>{title}</Heading>
        <Text lines={1} className="w-40" />
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full">{children}</div>
      </CardContent>
    </Card>
  )
}

/** A KPI tile with a hover tooltip (wrapped in a div so the tooltip trigger has one child). */
function TipTile({ label, value, tip }: { label: string; value: string; tip: string }) {
  return (
    <Tip label={tip}>
      <div>
        <StatTile label={label} value={value} />
      </div>
    </Tip>
  )
}

function NewReportModal() {
  return (
    <Modal
      trigger={
        <Button size="sm">
          <Label className="text-primary-foreground">New report</Label>
        </Button>
      }
      title="New report"
      description="Pick a template and date range to generate a report."
      footer={
        <>
          <Button variant="outline"><Label>Cancel</Label></Button>
          <Button><Label className="text-primary-foreground">Create</Label></Button>
        </>
      }
    >
      <div className="grid gap-4">
        <Field label="Report name"><Input readOnly /></Field>
        <Field label="Date range"><Input readOnly /></Field>
      </div>
    </Modal>
  )
}

/* Sample dashboard A — Analytics (tabs, KPIs + tooltips, charts, orders table + sort menu). */
function AnalyticsDashboard() {
  return (
    <DashboardShell
      brand="Acme"
      nav={['Overview', 'Reports', 'Customers', 'Settings']}
      active={0}
      title="Overview"
      actions={
        <>
          <NewReportModal />
          <Menu
            trigger={<Button variant="outline" size="sm"><Label>Account</Label></Button>}
            label="Signed in as Jordan"
            items={['Profile', 'Billing', 'Team', 'separator', 'Log out']}
          />
        </>
      }
    >
      <Tabs defaultValue="overview" className="gap-6">
        <TabsList>
          <TabsTrigger value="overview"><Label>Overview</Label></TabsTrigger>
          <TabsTrigger value="reports"><Label>Reports</Label></TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <Grid cols={4}>
            <TipTile label="Revenue" value="$42.8k" tip="+12% vs last month" />
            <TipTile label="Active users" value="1,204" tip="+5% vs last month" />
            <TipTile label="Orders" value="318" tip="-2% vs last month" />
            <TipTile label="Churn" value="2.4%" tip="Flat vs last month" />
          </Grid>
          <Grid cols={2}>
            <ChartCard title="Revenue over time"><AreaChart /></ChartCard>
            <ChartCard title="Traffic sources"><DonutChart /></ChartCard>
          </Grid>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Heading level={3}>Recent orders</Heading>
                <Menu
                  trigger={<Button variant="outline" size="sm"><Label>Sort</Label></Button>}
                  items={['Newest first', 'Oldest first', 'Amount', 'Status']}
                />
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={['Order', 'Customer', 'Status', 'Date', 'Total']} rows={5} selectable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Accordion type="single" collapsible defaultValue="item-0">
            {['Monthly summary', 'By channel', 'By region'].map((s, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger><Label>{s}</Label></AccordionTrigger>
                <AccordionContent>
                  <Text lines={3} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function AnalyticsMobile() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <Heading level={3}>Overview</Heading>
        <Menu
          trigger={<Button variant="outline" size="sm"><Label>Menu</Label></Button>}
          items={['Profile', 'Settings', 'separator', 'Log out']}
        />
      </div>
      <Grid cols={1}>
        <StatTile label="Revenue" value="$42.8k" />
        <StatTile label="Active users" value="1,204" />
      </Grid>
      <ChartCard title="Revenue over time"><LineChart /></ChartCard>
    </div>
  )
}

/* Sample dashboard B — Sales pipeline (bento: KPIs, bar + line, goals card, deals table + modal). */
function SalesDashboard() {
  return (
    <DashboardShell
      brand="Northwind"
      nav={['Dashboard', 'Pipeline', 'Accounts', 'Invoices', 'Settings']}
      active={1}
      title="Pipeline"
      actions={
        <Menu
          trigger={<Button variant="outline" size="sm"><Label>This quarter</Label></Button>}
          items={['This week', 'This month', 'This quarter', 'This year']}
        />
      }
    >
      <div className="space-y-6">
        <Grid cols={3}>
          <TipTile label="Open pipeline" value="$1.2M" tip="Across 48 deals" />
          <TipTile label="Closed won" value="$320k" tip="+8% vs last quarter" />
          <TipTile label="Win rate" value="42%" tip="Up from 38%" />
        </Grid>
        <Grid cols={2}>
          <ChartCard title="Deals by stage"><BarChart bars={[6, 8, 5, 9, 4]} /></ChartCard>
          <ChartCard title="Bookings trend"><LineChart /></ChartCard>
        </Grid>
        <Grid cols={2}>
          <Card>
            <CardHeader><Heading level={3}>Quota attainment</Heading></CardHeader>
            <CardContent className="gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Team</Label>
                <Progress value={64} />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">You</Label>
                <Progress value={88} />
              </div>
              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Health</Label>
                  <Gauge value={72} className="w-36" />
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-muted-foreground">Momentum</Label>
                  <Sparkline className="h-10" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <Heading level={3}>Open deals</Heading>
                <Modal
                  trigger={<Button size="sm"><Label className="text-primary-foreground">Add deal</Label></Button>}
                  title="Add deal"
                  description="Create a new opportunity in the pipeline."
                  footer={
                    <>
                      <Button variant="outline"><Label>Cancel</Label></Button>
                      <Button><Label className="text-primary-foreground">Save</Label></Button>
                    </>
                  }
                >
                  <div className="grid gap-4">
                    <Field label="Deal name"><Input readOnly /></Field>
                    <Field label="Value"><Input readOnly /></Field>
                  </div>
                </Modal>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={['Deal', 'Owner', 'Value']} rows={5} pagination={false} dense />
            </CardContent>
          </Card>
        </Grid>
      </div>
    </DashboardShell>
  )
}

function SalesMobile() {
  return (
    <div className="space-y-4 p-4">
      <Heading level={3}>Pipeline</Heading>
      <Grid cols={1}>
        <StatTile label="Open pipeline" value="$1.2M" />
      </Grid>
      <ChartCard title="Deals by stage"><BarChart bars={[6, 8, 5, 9, 4]} /></ChartCard>
      <Card>
        <CardHeader><Heading level={3}>Quota</Heading></CardHeader>
        <CardContent><Progress value={64} /></CardContent>
      </Card>
    </div>
  )
}

/* ---------------------------- Controls demo ---------------------------- */

function ControlsScreen() {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <Heading level={2}>Account settings</Heading>
        <Text lines={1} className="w-72" />
      </CardHeader>
      <CardContent className="gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Account name">
            <Input readOnly />
          </Field>
          <Field label="Plan">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="ent">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Country">
            <Combobox placeholder="Select country" options={['Poland', 'Germany', 'France', 'Spain']} />
          </Field>
          <Field label="Start date">
            <DatePicker />
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-3">
            <Label>Notify me about</Label>
            {['Email updates', 'SMS alerts', 'Push notifications'].map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox defaultChecked={i === 0} />
                <Label className="font-normal">{c}</Label>
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            <Label>Billing period</Label>
            <RadioGroup defaultValue="monthly" className="gap-3">
              {['Monthly', 'Yearly'].map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <RadioGroupItem value={r.toLowerCase()} />
                  <Label className="font-normal">{r}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable two-factor auth</Label>
          <Switch defaultChecked />
        </div>

        <Field label="Monthly budget">
          <Slider defaultValue={[40]} max={100} step={1} />
        </Field>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback> </AvatarFallback>
          </Avatar>
          <Badge><Label className="font-normal">New</Label></Badge>
          <Badge variant="secondary"><Label className="font-normal">Beta</Label></Badge>
          <Badge variant="outline"><Label className="font-normal">Draft</Label></Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-3 border-t pt-6">
        <Button variant="outline"><Label>Cancel</Label></Button>
        <Button><Label className="text-primary-foreground">Save changes</Label></Button>
      </CardFooter>
    </Card>
  )
}

/* ----------------------------- Charts demo ----------------------------- */

function ChartsScreen() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Grid cols={4}>
        <StatTile label="Revenue" value="$42.8k" delta="+12%" />
        <StatTile label="Sessions" value="18.2k" spark={[3, 6, 4, 7, 9, 8, 10]} />
        <StatTile label="Conversion" value="3.1%" />
        <StatTile label="Refunds" value="42" spark={false} />
      </Grid>
      <Grid cols={2}>
        <ChartCard title="Revenue over time"><LineChart /></ChartCard>
        <ChartCard title="Sign-ups"><AreaChart /></ChartCard>
        <ChartCard title="Orders by week"><BarChart /></ChartCard>
        <ChartCard title="Traffic sources"><DonutChart /></ChartCard>
      </Grid>
      <Grid cols={2}>
        <ChartCard title="Market share"><PieChart /></ChartCard>
        <Card>
          <CardHeader>
            <Heading level={3}>Goals</Heading>
            <Text lines={1} className="w-40" />
          </CardHeader>
          <CardContent className="gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Storage used</Label>
              <Progress value={72} />
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Quota</Label>
              <Progress value={38} />
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Satisfaction</Label>
                <Gauge value={78} className="w-40" />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-muted-foreground">30-day trend</Label>
                <Sparkline className="h-12" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  )
}

/* -------------------------------- Shell -------------------------------- */

type View = 'contact' | 'dashboard' | 'sales' | 'controls' | 'charts'

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: readonly T[]
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-md border border-neutral-300">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={
            'px-3 py-1.5 text-sm capitalize transition-colors ' +
            (value === o ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100')
          }
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [level, setLevel] = useState<FidelityLevel>('mid')
  const [view, setView] = useState<View>('dashboard')

  return (
    <div className="min-h-svh bg-neutral-100 text-foreground">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-3 border-b border-neutral-300 bg-white px-5 py-3">
        <span className="text-sm font-semibold">Wireframe Kit</span>
        <Segmented value={view} options={['contact', 'dashboard', 'sales', 'charts', 'controls'] as const} onChange={setView} />
        <span className="ml-auto text-xs text-neutral-500">Fidelity</span>
        <Segmented value={level} options={FIDELITY_LEVELS} onChange={setLevel} />
      </div>

      <div className="space-y-8 p-8">
        <Fidelity level={level}>
          {view === 'contact' ? (
            <DesktopFrame className="mx-auto max-w-4xl">
              <ContactScreen />
            </DesktopFrame>
          ) : view === 'controls' ? (
            <ControlsScreen />
          ) : view === 'charts' ? (
            <ChartsScreen />
          ) : view === 'sales' ? (
            <div className="space-y-8">
              <DesktopFrame className="mx-auto max-w-5xl">
                <SalesDashboard />
              </DesktopFrame>
              <MobileFrame>
                <SalesMobile />
              </MobileFrame>
            </div>
          ) : (
            <div className="space-y-8">
              <DesktopFrame className="mx-auto max-w-5xl">
                <AnalyticsDashboard />
              </DesktopFrame>
              <MobileFrame>
                <AnalyticsMobile />
              </MobileFrame>
            </div>
          )}
        </Fidelity>
      </div>
    </div>
  )
}
