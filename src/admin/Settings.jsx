import { Store, Bell, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const sections = [
  { icon: Store, title: 'Store profile', description: "Business name, address and contact details." },
  { icon: Bell, title: 'Notifications', description: 'Choose what you get notified about, and how.' },
  { icon: ShieldCheck, title: 'Security', description: 'Password, two-factor authentication and login activity.' },
  { icon: CreditCard, title: 'Payment methods', description: 'Payout accounts and supported payment options.' },
];

export default function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure how the Kemzy Boutique admin workspace runs."
      />
      <div className="divide-y divide-ink-100 border border-ink-100 bg-white">
        {sections.map(({ icon: Icon, title, description }) => (
          <button
            key={title}
            className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-bone-200"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-100 text-brass-600">
              <Icon size={18} strokeWidth={1.5} />
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium text-ink-800">{title}</span>
              <span className="block text-xs text-ink-400">{description}</span>
            </span>
            <ChevronRight size={16} className="text-ink-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
