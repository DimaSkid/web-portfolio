<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class LocaleSubscriber implements EventSubscriberInterface
{
    private string $defaultLocale;

    public function __construct(string $defaultLocale = 'fr')
    {
        $this->defaultLocale = $defaultLocale;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();

        // priority: ?_locale query param -> session -> default
        if ($request->query->has('_locale')) {
            $locale = $request->query->get('_locale');
            $request->getSession()?->set('_locale', $locale);
            $request->setLocale($locale);
            return;
        }

        $session = $request->getSession();
        if ($session && $session->has('_locale')) {
            $request->setLocale($session->get('_locale'));
            return;
        }

        $request->setLocale($this->defaultLocale);
    }

    public static function getSubscribedEvents(): array
    {
        return [KernelEvents::REQUEST => [['onKernelRequest', 20]]];
    }
}
