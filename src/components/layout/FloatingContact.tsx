import { useState } from "react";
import { Phone, MessageCircle, Mail, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      label: "Call",
      href: "tel:+919876543210",
      className: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      className: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:hello@firdausmakeover.com",
      className: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="flex flex-col space-y-3 mb-4 animate-fade-in-up">
          {contactOptions.map((option, index) => (
            <a
              key={index}
              href={option.href}
              target={option.href.startsWith('http') ? '_blank' : undefined}
              rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${option.className}`}
            >
              <option.icon className="h-5 w-5" />
              <span className="font-medium">{option.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <Button
        variant="floating"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 animate-float"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default FloatingContact;