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
            $tmp = [
                "id" => $movie->getId(),
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
            $data,
        ]);
    }


    /**
     * @Route("/movies/{id}", name="movie-id", methods="get", requirements={"id": "\d+"})
     */
    public function findById($id){

        $movie = $this->getDoctrine()->getRepository(Movie::class)->find($id);

        $data = [
            "id" => $movie->getId(),
            "title" =>  $movie->getTitle(),
            "actors" => $movie->getActors(),
            "date" => $movie->getDate(),
            "description" =>  $movie->getDescription(),
            "genders" => $movie->getGenders(),
            "images" => $movie->getImages(),
            "trailers" => $movie->getTrailers(),
            "duration" => $movie->getDuration()
        ];

        return $this->json([
            $data
        ]);
    }
}
