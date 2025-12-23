import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Calendar, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);

  // Auto-show on first load
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited) {
      // Show buttons after a brief delay
      setTimeout(() => {
        setIsOpen(true);
        setHasShownInitial(true);
      }, 500);

      // Hide after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem('hasVisitedBefore', 'true');
      }, 2500);
    }
  }, []);

  // Close when clicking anywhere on the page
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close if clicking on the floating contact buttons themselves
      if (!target.closest('[data-floating-contact]')) {
        setIsOpen(false);
      }
    };

    if (isOpen && hasShownInitial) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, hasShownInitial]);

  const contactOptions = [
    {
      icon: Calendar,
      label: "Book Appointment",
      href: "/contact",
      className: "bg-primary hover:bg-primary/90",
      isInternal: true,
    },
    {
      icon: Phone,
      label: "Call Now",
      href: "tel:8401050169",
      className: "bg-green-500 hover:bg-green-600",
      isInternal: false,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/918401050169",
      className: "bg-green-600 hover:bg-green-700",
      isInternal: false,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" data-floating-contact>
      {/* Contact Options */}
      {isOpen && (
        <div className="flex flex-col space-y-3 mb-4 animate-fade-in-up">
          {contactOptions.map((option, index) => 
            option.isInternal ? (
              <Link
                key={index}
                to={option.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${option.className}`}
              >
                <option.icon className="h-5 w-5" />
                <span className="font-medium">{option.label}</span>
              </Link>
            ) : (
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
            )
          )}
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