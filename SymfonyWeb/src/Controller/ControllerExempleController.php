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
}
