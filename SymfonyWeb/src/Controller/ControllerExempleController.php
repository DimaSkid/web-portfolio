<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ControllerExempleController extends AbstractController
{
    #[Route('', name: 'app_controller_exemple')]
    public function index(): Response
    {
        return $this->render('controller_exemple/index.html.twig', [
            'controller_name' => 'ControllerExempleController',
        ]);
    }

    #[Route('/Contact', name: 'app_contact')]
    public function contact(): Response
    {
        return $this->render('controller_exemple/contact.html.twig');
    }
}
