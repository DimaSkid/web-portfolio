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

    #[Route('/sae-details', name: 'sae_details')]
    public function saeDetails(): Response
    {
        return $this->render('controller_exemple/sae_details.html.twig');
    }

    #[Route('/projets', name: 'projets')]
    public function projets(): Response
    {
        return $this->render('controller_exemple/projets.html.twig');
    }

    #[Route('/loisirs', name: 'loisirs')]
    public function loisirs(): Response
    {
        return $this->render('controller_exemple/loisirs.html.twig');
    }

    #[Route('/realisations', name: 'realisations')]
    public function realisations(): Response
    {
        return $this->render('controller_exemple/realisations.html.twig');
    }

    #[Route('/cv', name: 'cv')]
    public function cv(): Response
    {
        return $this->render('controller_exemple/cv.html.twig');
    }
}
