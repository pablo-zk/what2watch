<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ClientController extends AbstractController
{
    private const API_URL = 'https://api.themoviedb.org/3';
    private const language = 'es-ES';
    private const API_KEY = '271f5ee338641272122ca858b5627325';
    private $httpClient;

    public function __construct(HttpClientInterface $client)
    {
        $this->httpClient = $client;
    }


    /**
     * @Route("/getGenreList/{type}", name="getGenreList")
     */
    public function getGenreList($type){
        $response = $this->httpClient->request('GET', self::API_URL.'/genre/'.$type.'/list?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getCredits/{type}/{id}", name="getCredits")
     */
    public function getCredits($type,$id){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/'.$id.'/credits?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getSeasons/{id}/{season}", name="getSeasons")
     */
    public function getSeasons($id,$season){
        $response = $this->httpClient->request('GET', self::API_URL.'/tv/'.$id.'/season/'.$season.'?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getEpisodes/{id}/{season}/{episode}", name="getEpisodes")
     */
    public function getEpisodes($id,$season,$episode){
        $response = $this->httpClient->request('GET', self::API_URL.'/tv/'.$id.'/season/'.$season.'/episode/'.$episode.'?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getSearchList/{e}", name="getSearchList")
     */
    public function getSearchList($e){
        $response = $this->httpClient->request('GET', self::API_URL.'/search/multi?api_key='.self::API_KEY.'&language='.self::language.'&include_adult=true&query='.$e);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getTodayTrendingList", name="w-tmbd")
     */
    public function getTodayTrendingList(){
        $response = $this->httpClient->request('GET', 'https://api.themoviedb.org/3/trending/all/day?api_key='.self::API_KEY.'&language=es-ES');
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getWeekTrendingList", name="prueba-tmbd")
     */
    public function getWeekTrendingList(){
        $response = $this->httpClient->request('GET', self::API_URL.'/trending/all/week?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getPopularList/{type}/{page}", name="getPopularList")
     */
    public function getPopularList($type,$page){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/popular?api_key='.self::API_KEY.'&language='.self::language.'&page='.$page);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getDetailList/{type}/{id}", name="getDetailList")
     */
    public function getDetailList($type,$id){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/'.$id.'?api_key='.self::API_KEY.'&language='.self::language);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getImagesList/{type}/{id}", name="getImagesList")
     */
    public function getImagesList($type,$id){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/'.$id.'/images?api_key='.self::API_KEY.'&include_image_language=es,en');
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getWatchProviders/{type}/{id}", name="getWatchProviders")
     */
    public function getWatchProviders($type,$id){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/'.$id.'/watch/providers?api_key='.self::API_KEY);
        return $this->json(json_decode($response->getContent()));
    }

    /**
     * @Route("/getRecommendations/{type}/{id}", name="getRecommendations")
     */
    public function getRecommendations($type,$id){
        $response = $this->httpClient->request('GET', self::API_URL.'/'.$type.'/'.$id.'/recommendations?api_key='.self::API_KEY);
        return $this->json(json_decode($response->getContent()));
    }
}
