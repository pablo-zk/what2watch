<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Movie;

class PruebaController extends AbstractController
{
    /**
     * @Route("/movies", name="movies")
     */
    public function index(): Response
    {
        $movies =  $this->getDoctrine()->getRepository(Movie::class)->findAll();
        
        $data = [];

        foreach ($movies as $movie){
            $tmp =[
               "title" =>  $movie->getTitle(),
                "actors" => $movie->getActors(),
                "date" => $movie->getDate(),
                "description" =>  $movie->getDescription(),
                "genders" => $movie->getGenders(),
                "images" => $movie->getImages(),
                "trailers" => $movie->getTrailers(),
                "duration" => $movie->getDuration()
            ];
            $data[] = $tmp;
        }

        return $this->json([
            'message' => 'Estas son nuestras movies',
            'movies' => $data,
        ]);
    }
}
